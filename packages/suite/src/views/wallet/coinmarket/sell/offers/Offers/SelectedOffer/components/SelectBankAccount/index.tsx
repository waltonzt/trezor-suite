import React, { useState } from 'react';
import styled from 'styled-components';
import { QuestionTooltip, Translation } from '@suite-components';
import { variables, Button, Select, Icon } from '@trezor/components';
import { useCoinmarketSellOffersContext } from '@wallet-hooks/useCoinmarketSellOffers';
import { BankAccount } from 'invity-api';
import { formatIban } from '@wallet-utils/coinmarket/sellUtils';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const Heading = styled.div`
    color: ${props => props.theme.TYPE_LIGHT_GREY};
    padding: 16px 24px 0 24px;
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    font-size: ${variables.FONT_SIZE.SMALL};
`;

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 24px 0 24px;
`;

const Label = styled.div`
    display: flex;
    align-items: center;
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
`;

const StyledQuestionTooltip = styled(QuestionTooltip)`
    padding-left: 3px;
`;

const CustomLabel = styled(Label)`
    padding: 12px 0;
`;

const LabelText = styled.div``;

const Option = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const AccountWrapper = styled.div`
    display: flex;
    padding: 0 0 0 5px;
    flex-direction: column;
    width: 100%;
`;

const AccountNumber = styled.div`
    display: flex;
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
`;

const AccountRow = styled.div`
    display: flex;
`;

const AccountLeft = styled.div`
    display: flex;
    flex: 2;
    align-self: center;
`;

const AccountRight = styled.div`
    display: flex;
    justify-content: flex-end;
    flex: 1;
    align-self: center;
`;

const AccountName = styled.div`
    color: ${props => props.theme.TYPE_LIGHT_GREY};
`;

const AccountVerified = styled.div`
    color: ${props => props.theme.TYPE_GREEN};
    font-size: ${variables.FONT_SIZE.TINY};
`;

const AccountNotVerified = styled.div`
    color: ${props => props.theme.TYPE_LIGHT_GREY};
    font-size: ${variables.FONT_SIZE.TINY};
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    border-top: 1px solid ${props => props.theme.STROKE_GREY};
    margin: 20px 0;
`;

const Row = styled.div`
    margin: 12px 0;
`;

const RegisterAnother = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
`;

const StyledIcon = styled(Icon)`
    width: 10px;
    margin-right: 12px;
`;

const SelectBankAccount = () => {
    const {
        callInProgress,
        confirmTrade,
        addBankAccount,
        selectedQuote,
    } = useCoinmarketSellOffersContext();
    const [bankAccount, setBankAccount] = useState<BankAccount | undefined>(
        selectedQuote?.bankAccounts ? selectedQuote?.bankAccounts[0] : undefined,
    );
    if (!selectedQuote || !selectedQuote.bankAccounts) return null;
    const { bankAccounts } = selectedQuote;

    return (
        <Wrapper>
            <Heading>
                <Translation id="TR_SELL_BANK_ACCOUNT_INFO" />
            </Heading>
            <CardContent>
                <Row>
                    <CustomLabel>
                        <LabelText>
                            <Translation id="TR_SELL_BANK_ACCOUNT" />
                        </LabelText>
                        <StyledQuestionTooltip tooltip="TR_SELL_BANK_ACCOUNT_TOOLTIP" />
                    </CustomLabel>
                    <Select
                        onChange={(selected: BankAccount) => {
                            setBankAccount(selected);
                        }}
                        noTopLabel
                        value={bankAccount}
                        isClearable={false}
                        options={bankAccounts}
                        minWidth="70px"
                        formatOptionLabel={(option: BankAccount) => {
                            return (
                                <Option>
                                    <AccountWrapper>
                                        <AccountRow>
                                            <AccountLeft>
                                                <AccountNumber>
                                                    {formatIban(option.bankAccount)}
                                                </AccountNumber>
                                            </AccountLeft>
                                            <AccountRight>
                                                {option.verified ? (
                                                    <AccountVerified>
                                                        <Translation id="TR_SELL_BANK_ACCOUNT_VERIFIED" />
                                                    </AccountVerified>
                                                ) : (
                                                    <AccountNotVerified>
                                                        <Translation id="TR_SELL_BANK_ACCOUNT_NOT_VERIFIED" />
                                                    </AccountNotVerified>
                                                )}
                                            </AccountRight>
                                        </AccountRow>
                                        <AccountRow>
                                            <AccountName>{option.holder}</AccountName>
                                        </AccountRow>
                                    </AccountWrapper>
                                </Option>
                            );
                        }}
                        isOptionDisabled={(option: BankAccount) => !option.verified}
                        isDropdownVisible={bankAccounts.length > 1}
                        isDisabled={bankAccounts.length < 2}
                    />
                </Row>
            </CardContent>
            <CardContent>
                <Row>
                    <RegisterAnother
                        onClick={() => {
                            if (bankAccount) addBankAccount();
                        }}
                    >
                        <StyledIcon icon="PLUS" />
                        <Label>
                            <Translation id="TR_SELL_ADD_BANK_ACCOUNT" />
                        </Label>
                    </RegisterAnother>
                </Row>
            </CardContent>
            <ButtonWrapper>
                <Button
                    isLoading={callInProgress}
                    onClick={() => {
                        if (bankAccount) confirmTrade(bankAccount);
                    }}
                    isDisabled={callInProgress}
                >
                    <Translation id="TR_SELL_GO_TO_TRANSACTION" />
                </Button>
            </ButtonWrapper>
        </Wrapper>
    );
};

export default SelectBankAccount;
