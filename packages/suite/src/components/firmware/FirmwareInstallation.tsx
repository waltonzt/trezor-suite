import React from 'react';
import { ConfirmOnDevice, Button } from '@trezor/components';
import { getTextForStatus } from '@firmware-utils';
import { Translation } from '@suite-components';
import { useDevice, useFirmware, useOnboarding } from '@suite-hooks';
import { FirmwareOffer, ReconnectDevicePrompt, OnboardingStepBox } from '@firmware-components';
import { getFwUpdateVersion, getFwVersion } from '@suite-utils/device';
import { AcquiredDevice } from '@suite-types';
import ProgressBar from './ProgressBar';

interface Props {
    cachedDevice: AcquiredDevice;
}
const FirmwareInstallation = ({ cachedDevice }: Props) => {
    const { device } = useDevice();
    const { status, installingProgress, resetReducer } = useFirmware();
    const { goToNextStep } = useOnboarding();
    const statusIntlId = getTextForStatus(status);
    const statusText = statusIntlId ? <Translation id={statusIntlId} /> : null;

    return (
        <>
            {/* Modal to instruct user to disconnect the device and reconnect in normal mode */}
            {(status === 'unplug' || status === 'reconnect-in-normal') && (
                <ReconnectDevicePrompt
                    deviceVersion={cachedDevice?.features?.major_version || 2}
                    requestedMode="normal"
                />
            )}
            <OnboardingStepBox
                heading={<Translation id="TR_INSTALL_FIRMWARE" />}
                confirmOnDevice={
                    status === 'waiting-for-confirmation' ? (
                        <ConfirmOnDevice
                            title={<Translation id="TR_CONFIRM_ON_TREZOR" />}
                            trezorModel={device?.features?.major_version === 1 ? 1 : 2}
                        />
                    ) : undefined
                }
                outerActions={
                    // Show continue button after the installation is completed
                    status === 'done' || status === 'partially-done' ? (
                        // todo: this needs to be different action in separate fw flow
                        <Button
                            variant="primary"
                            onClick={status === 'done' ? () => goToNextStep() : resetReducer}
                            data-test="@firmware/continue-button"
                        >
                            <Translation id="TR_CONTINUE" />
                        </Button>
                    ) : undefined
                }
            >
                <FirmwareOffer
                    currentVersion={getFwVersion(cachedDevice)}
                    newVersion={getFwUpdateVersion(cachedDevice)}
                    releaseChangelog={cachedDevice.firmwareRelease}
                />

                {status !== 'waiting-for-confirmation' && status !== 'started' && (
                    // Progress bar shown only in 'installing', 'wait-for-reboot', 'unplug', 'reconnect-in-normal', 'done'
                    <ProgressBar
                        label={statusText}
                        total={100}
                        current={installingProgress || 0}
                        maintainCompletedState
                    />
                )}
            </OnboardingStepBox>
        </>
    );
};

export default FirmwareInstallation;
export { FirmwareInstallation };
