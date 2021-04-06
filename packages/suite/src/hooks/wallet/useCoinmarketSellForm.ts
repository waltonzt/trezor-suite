import { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SellFiatTradeQuoteRequest } from 'invity-api';
import { useActions } from '@suite-hooks';
import invityAPI from '@suite-services/invityAPI';
import regional from '@wallet-constants/coinmarket/regional';
import { fromFiatCurrency } from '@wallet-utils/fiatConverterUtils';
import { getFeeLevels } from '@wallet-utils/sendFormUtils';
import { FormState } from '@wallet-types/sendForm';
import { useInvityAPI } from '@wallet-hooks/useCoinmarket';
import * as coinmarketSellActions from '@wallet-actions/coinmarketSellActions';
import * as coinmarketCommonActions from '@wallet-actions/coinmarket/coinmarketCommonActions';
import * as routerActions from '@suite-actions/routerActions';
import {
    SellFormState,
    Props,
    AmountLimits,
    SellFormContextValues,
    CRYPTO_INPUT,
    FIAT_INPUT,
    OUTPUT_AMOUNT,
    FIAT_CURRENCY_SELECT,
} from '@wallet-types/coinmarketSellForm';
import { getComposeAddressPlaceholder } from '@wallet-utils/coinmarket/coinmarketUtils';
import { getAmountLimits, processQuotes } from '@wallet-utils/coinmarket/sellUtils';
import { useFees } from './form/useFees';
import { useCompose } from './form/useCompose';
import { DEFAULT_PAYMENT, DEFAULT_VALUES } from '@wallet-constants/sendForm';

export const SellFormContext = createContext<SellFormContextValues | null>(null);
SellFormContext.displayName = 'CoinmarketSellContext';

const useSellState = ({ selectedAccount, fees }: Props, currentState: boolean) => {
    // do not calculate if currentState is already set (prevent re-renders)
    if (selectedAccount.status !== 'loaded' || currentState) return;

    const { account, network } = selectedAccount;
    const coinFees = fees[account.symbol];
    const levels = getFeeLevels(account.networkType, coinFees);
    const feeInfo = { ...coinFees, levels };

    return {
        account,
        network,
        feeInfo,
        formValues: {
            ...DEFAULT_VALUES,
            outputs: [
                {
                    ...DEFAULT_PAYMENT,
                },
            ],
            options: ['broadcast'],
        } as FormState, // TODO: remove type casting (options string[])
    };
};

export const useCoinmarketSellForm = (props: Props): SellFormContextValues => {
    const { sellInfo } = useInvityAPI();
    const {
        selectedAccount,
        quotesRequest,
        fees,
        fiat,
        localCurrency,
        exchangeCoinInfo,
        device,
    } = props;
    const { account, network } = selectedAccount;
    const { symbol, networkType } = account;

    const coinFees = fees[symbol];
    const levels = getFeeLevels(networkType, coinFees);
    const feeInfo = { ...coinFees, levels };
    const fiatRates = fiat.coins.find(item => item.symbol === symbol);
    const localCurrencyOption = { value: localCurrency, label: localCurrency.toUpperCase() };

    const [state, setState] = useState<ReturnType<typeof useSellState>>(undefined);

    // throttle initial state calculation
    const initState = useSellState(props, !!state);
    useEffect(() => {
        const setStateAsync = async (initState: ReturnType<typeof useSellState>) => {
            const address = await getComposeAddressPlaceholder(account, network, device);
            if (initState && address) {
                initState.formValues.outputs[0].address = address;
                setState(initState);
            }
        };

        if (!state && initState) {
            setStateAsync(initState);
        }
    }, [state, initState, account, network, device]);

    const methods = useForm<SellFormState>({
        mode: 'onChange',
        shouldUnregister: false, // NOTE: tracking custom fee inputs
        defaultValues: { selectedFee: 'normal', feePerUnit: '', feeLimit: '' },
    });
    const { reset, register, setValue, getValues, setError, clearErrors, watch, trigger } = methods;

    // react-hook-form auto register custom form fields (without HTMLElement)
    useEffect(() => {
        register({ name: 'options', type: 'custom' });
        register({ name: 'outputs', type: 'custom' });
        register({ name: 'setMaxOutputId', type: 'custom' });
    }, [register]);

    // react-hook-form reset, set default values
    useEffect(() => {
        if (state) {
            reset(state?.formValues);
        }
    }, [reset, state]);

    const { isLoading: isComposing, composeRequest, composedLevels, onFeeLevelChange } = useCompose(
        {
            ...methods,
            state,
        },
    );

    const [amountLimits, setAmountLimits] = useState<AmountLimits | undefined>(undefined);
    const {
        saveQuoteRequest,
        saveQuotes,
        saveTrade,
        saveComposedTransactionInfo,
        goto,
    } = useActions({
        saveQuoteRequest: coinmarketSellActions.saveQuoteRequest,
        saveQuotes: coinmarketSellActions.saveQuotes,
        saveTrade: coinmarketSellActions.saveTrade,
        saveComposedTransactionInfo: coinmarketCommonActions.saveComposedTransactionInfo,
        goto: routerActions.goto,
    });

    const typedRegister = useCallback(<T>(rules?: T) => register(rules), [register]);
    const isLoading = !sellInfo?.sellList || !state?.formValues.outputs[0].address;
    const noProviders =
        sellInfo?.sellList?.providers.length === 0 ||
        !sellInfo?.supportedCryptoCurrencies.has(account.symbol);

    const country = sellInfo?.sellList?.country || regional.unknownCountry;
    const defaultCountry = {
        label: regional.countriesMap.get(country),
        value: country,
    };

    const defaultCurrency = { label: 'EUR', value: 'eur' };

    // sub-hook, FeeLevels handler
    const { changeFeeLevel } = useFees({
        defaultValue: 'normal',
        feeInfo,
        onChange: onFeeLevelChange,
        composeRequest,
        ...methods,
    });

    // watch change in crypto amount and recalculate fees on change
    const cryptoAmount = watch(CRYPTO_INPUT);
    useEffect(() => {
        if (!cryptoAmount) return;
        const origValue = getValues(OUTPUT_AMOUNT);
        if (origValue === cryptoAmount) return;
        setValue(OUTPUT_AMOUNT, cryptoAmount);
        composeRequest();
    }, [composeRequest, cryptoAmount, getValues, setValue]);

    // watch change in fiat amount and recalculate fees on change
    const fiatAmount = watch(FIAT_INPUT);
    useEffect(() => {
        if (!fiatAmount) return;
        const currency: { value: string; label: string } | undefined = getValues(
            FIAT_CURRENCY_SELECT,
        );
        if (!fiatRates || !fiatRates.current || !currency) return;
        const cryptoValue = fromFiatCurrency(
            fiatAmount,
            currency.value,
            fiatRates.current.rates,
            network.decimals,
        );
        const origValue = getValues(OUTPUT_AMOUNT);
        if (origValue === cryptoValue) return;
        setValue(OUTPUT_AMOUNT, cryptoValue);
        composeRequest(FIAT_INPUT);
    }, [
        fiatAmount,
        cryptoAmount,
        setValue,
        getValues,
        fiatRates,
        composeRequest,
        network.decimals,
    ]);

    useEffect(() => {
        if (!composedLevels) return;
        const values = getValues();
        const { setMaxOutputId } = values;
        const selectedFee = values.selectedFee || 'normal';
        const composed = composedLevels[selectedFee || 'normal'];
        if (!composed) return;

        if (composed.type === 'error') {
            if (composed.errorMessage) {
                setError(CRYPTO_INPUT, {
                    type: 'compose',
                    message: composed.errorMessage as any,
                });
            }
        }
        // set calculated and formatted "max" value to `Amount` input
        else if (composed.type === 'final') {
            if (typeof setMaxOutputId === 'number' && composed.max) {
                setValue(CRYPTO_INPUT, composed.max, { shouldValidate: true });
                clearErrors(CRYPTO_INPUT);
            }
            saveComposedTransactionInfo({ selectedFee, composed });
            setValue('estimatedFeeLimit', composed.estimatedFeeLimit);
        }
    }, [clearErrors, composedLevels, getValues, saveComposedTransactionInfo, setError, setValue]);

    const onSubmit = async () => {
        const formValues = getValues();
        const fiatStringAmount = formValues.fiatInput;
        const cryptoStringAmount = formValues.cryptoInput;
        const amountInCrypto = !fiatStringAmount;
        const request: SellFiatTradeQuoteRequest = {
            amountInCrypto,
            cryptoCurrency: formValues.cryptoCurrencySelect.value.toUpperCase(),
            fiatCurrency: formValues.fiatCurrencySelect.value.toUpperCase(),
            country: formValues.countrySelect.value,
            cryptoStringAmount,
            fiatStringAmount,
        };

        saveQuoteRequest(request);
        const allQuotes = await invityAPI.getSellQuotes(request);
        const limits = getAmountLimits(request, allQuotes);

        if (limits) {
            setAmountLimits(limits);
            trigger([CRYPTO_INPUT, FIAT_INPUT]);
        } else {
            const [quotes, alternativeQuotes] = processQuotes(allQuotes);
            saveQuotes(quotes, alternativeQuotes);
            goto('wallet-coinmarket-sell-offers', {
                symbol: account.symbol,
                accountIndex: account.index,
                accountType: account.accountType,
            });
        }
    };

    return {
        ...methods,
        account,
        defaultCountry,
        defaultCurrency,
        onSubmit,
        register: typedRegister,
        sellInfo,
        changeFeeLevel,
        saveQuoteRequest,
        saveQuotes,
        quotesRequest,
        composedLevels,
        localCurrencyOption,
        exchangeCoinInfo,
        saveTrade,
        feeInfo,
        composeRequest,
        fiatRates,
        isComposing,
        amountLimits,
        setAmountLimits,
        isLoading,
        noProviders,
        network,
    };
};

export const useCoinmarketSellFormContext = () => {
    const context = useContext(SellFormContext);
    if (context === null) throw Error('SellFormContext used without Context');
    return context;
};
