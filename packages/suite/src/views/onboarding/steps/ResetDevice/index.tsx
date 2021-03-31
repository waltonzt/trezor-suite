import React from 'react';
import { variables } from '@trezor/components';
import * as STEP from '@onboarding-constants/steps';
import { OnboardingButton, NeueOption, OnboardingLayout } from '@onboarding-components';
import { Translation } from '@suite-components';
import { OnboardingStepBox } from '@firmware-components';
import { useActions, useSelector } from '@suite-hooks';
import * as deviceSettingsActions from '@settings-actions/deviceSettingsActions';
import * as onboardingActions from '@onboarding-actions/onboardingActions';
import styled from 'styled-components';

const OptionsWrapper = styled.div`
    display: flex;

    @media all and (max-width: ${variables.SCREEN_SIZE.SM}) {
        flex-direction: column;
    }
`;

const OptionWrapper = styled.div`
    display: flex;
    width: 100%;
`;

const Divider = styled.div`
    flex: 0 0 24px;
`;

const ResetDeviceStep = () => {
    const { resetDevice, goToPreviousStep, callActionAndGoToNextStep } = useActions({
        resetDevice: deviceSettingsActions.resetDevice,
        goToPreviousStep: onboardingActions.goToPreviousStep,
        callActionAndGoToNextStep: onboardingActions.callActionAndGoToNextStep,
    });
    const device = useSelector(state => state.suite.device);

    // this step expects device
    if (!device || !device.features) {
        return null;
    }

    const isShamirBackupAvailable = device.features?.capabilities?.includes('Capability_Shamir');
    const isWaitingForConfirmation = device.buttonRequests.some(
        r => r === 'ButtonRequest_ResetDevice' || r === 'ButtonRequest_ProtectCall',
    );

    return (
        <OnboardingLayout activeStep={1}>
            <OnboardingStepBox
                image="KEY"
                heading={<Translation id="TR_ONBOARDING_GENERATE_SEED" />}
                description={<Translation id="TR_ONBOARDING_GENERATE_SEED_DESCRIPTION" />}
                confirmOnDevice={
                    isWaitingForConfirmation ? device?.features?.major_version : undefined
                }
                outerActions={
                    <OnboardingButton.Back onClick={() => goToPreviousStep()}>
                        <Translation id="TR_BACK" />
                    </OnboardingButton.Back>
                }
            >
                {!isWaitingForConfirmation ? (
                    // Show options to chose from only if we are not waiting for confirmation on the device (because that means user has already chosen )
                    <OptionsWrapper>
                        <OptionWrapper>
                            <NeueOption
                                icon="SEED_SINGLE"
                                data-test={
                                    isShamirBackupAvailable
                                        ? '@onboarding/button-standard-backup'
                                        : '@onboarding/only-backup-option-button'
                                }
                                onClick={() => {
                                    if (isShamirBackupAvailable) {
                                        callActionAndGoToNextStep(
                                            // eslint-disable-next-line @typescript-eslint/naming-convention
                                            () => resetDevice({ backup_type: 0 }),
                                            STEP.ID_SECURITY_STEP,
                                        );
                                    } else {
                                        callActionAndGoToNextStep(
                                            resetDevice,
                                            STEP.ID_SECURITY_STEP,
                                        );
                                    }
                                }}
                                heading={<Translation id="SINGLE_SEED" />}
                                description={<Translation id="SINGLE_SEED_DESCRIPTION" />}
                            />
                        </OptionWrapper>
                        {isShamirBackupAvailable && (
                            <>
                                <Divider />
                                <OptionWrapper>
                                    <NeueOption
                                        icon="SEED_SHAMIR"
                                        onClick={() => {
                                            callActionAndGoToNextStep(
                                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                                () => resetDevice({ backup_type: 1 }),
                                                STEP.ID_SECURITY_STEP,
                                            );
                                        }}
                                        heading={<Translation id="SHAMIR_SEED" />}
                                        description={<Translation id="SHAMIR_SEED_DESCRIPTION" />}
                                    />
                                </OptionWrapper>
                            </>
                        )}
                    </OptionsWrapper>
                ) : undefined}
            </OnboardingStepBox>
        </OnboardingLayout>
    );
};

export default ResetDeviceStep;
