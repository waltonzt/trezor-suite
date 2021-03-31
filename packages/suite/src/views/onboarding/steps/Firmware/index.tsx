import React, { useMemo, useState } from 'react';

import { OnboardingLayout } from '@onboarding-components';
import { Translation } from '@suite-components';
import {
    CheckSeedStep,
    PartiallyDoneStep,
    ContinueButton,
    RetryButton,
    ErrorImg,
    FirmwareInstallation,
    OnboardingStepBox,
    FirmwareInitial,
} from '@firmware-components';
import { useSelector, useActions } from '@suite-hooks';
import * as onboardingActions from '@onboarding-actions/onboardingActions';
import * as firmwareActions from '@firmware-actions/firmwareActions';
import { AcquiredDevice } from '@suite-types';
import { getFwVersion } from '@suite-utils/device';

const FirmwareStep = () => {
    const { device, firmware } = useSelector(state => ({
        device: state.suite.device,
        firmware: state.firmware,
    }));

    const { goToNextStep, resetReducer, firmwareUpdate } = useActions({
        goToNextStep: onboardingActions.goToNextStep,
        goToPreviousStep: onboardingActions.goToPreviousStep,
        resetReducer: firmwareActions.resetReducer,
        firmwareUpdate: firmwareActions.firmwareUpdate,
    });

    const [cachedDevice, setCachedDevice] = useState<AcquiredDevice>(device as AcquiredDevice);

    // TODO: useless memo?
    const Component = useMemo(() => {
        // edge case 1 - error
        if (firmware.error) {
            return {
                Body: (
                    <OnboardingStepBox
                        image="FIRMWARE"
                        heading={<Translation id="TR_FW_INSTALLATION_FAILED" />}
                        description={
                            <Translation
                                id="TOAST_GENERIC_ERROR"
                                values={{ error: firmware.error }}
                            />
                        }
                        innerActions={<RetryButton onClick={firmwareUpdate} />}
                    >
                        <ErrorImg />
                    </OnboardingStepBox>
                ),
            };
        }

        // // edge case 2 - user has reconnected device that is already up to date
        if (firmware.status !== 'done' && device?.firmware === 'valid') {
            return {
                Body: (
                    <OnboardingStepBox
                        image="FIRMWARE"
                        heading={<Translation id="TR_FIRMWARE_IS_UP_TO_DATE" />}
                        description={
                            <Translation
                                id="TR_FIRMWARE_INSTALLED_TEXT"
                                values={{ version: getFwVersion(device) }}
                            />
                        }
                        outerActions={<ContinueButton onClick={() => goToNextStep()} />}
                    />
                ),
            };
        }

        console.log('firmware.status', firmware.status);
        switch (firmware.status) {
            case 'initial':
            case 'waiting-for-bootloader': // waiting for user to reconnect in bootloader
                return {
                    Body: (
                        <FirmwareInitial
                            cachedDevice={cachedDevice}
                            setCachedDevice={setCachedDevice}
                        />
                    ),
                };
            case 'check-seed':
                // TODO: remove this case? it is only relevant in separate fw update flow and not even triggered used in onboarding
                return {
                    Body: <CheckSeedStep.Body />,
                    BottomBar: <CheckSeedStep.BottomBar />,
                };
            case 'waiting-for-confirmation': // waiting for confirming installation on a device
            case 'started': // called firmwareUpdate()
            case 'installing':
            case 'wait-for-reboot':
            case 'unplug':
            case 'reconnect-in-normal':
            case 'done':
                return {
                    Body: <FirmwareInstallation cachedDevice={cachedDevice} />,
                };

            case 'partially-done':
                return {
                    Body: <PartiallyDoneStep.Body />,
                    BottomBar: <ContinueButton onClick={resetReducer} />,
                };
            // case 'done':
            //     return {
            //         Body: <DoneStep.Body />,
            //         BottomBar: <ContinueButton onClick={() => goToNextStep()} />,
            //     };

            default:
                // 'ensure' type completeness
                throw new Error(`state "${firmware.status}" is not handled here`);
        }
    }, [
        cachedDevice,
        device,
        firmware.error,
        firmware.status,
        firmwareUpdate,
        goToNextStep,
        resetReducer,
    ]);

    return (
        <OnboardingLayout activeStep={0}>
            {Component.Body}

            {/* Back button for initial case and in case of error */}
            {/* <Wrapper.StepFooter>
                    {['initial', 'error'].includes(firmware.status) && (
                        <OnboardingButton.Back
                            onClick={() =>
                                firmware.status === 'error' ? resetReducer() : goToPreviousStep()
                            }
                        >
                            <Translation id="TR_BACK" />
                        </OnboardingButton.Back>
                    )}
                </Wrapper.StepFooter> */}
        </OnboardingLayout>
    );
};

export default FirmwareStep;
