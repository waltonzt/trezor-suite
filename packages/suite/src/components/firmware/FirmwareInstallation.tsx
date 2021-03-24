import React from 'react';
import { ConfirmOnDevice, Button } from '@trezor/components';
import { getTextForStatus, getDescriptionForStatus } from '@firmware-utils';
import { Translation } from '@suite-components';
import { useDevice, useFirmware, useOnboarding } from '@suite-hooks';
import { P, FirmwareOffer, ReconnectDevicePrompt, OnboardingStepBox } from '@firmware-components';
import { getFwUpdateVersion, getFwVersion } from '@suite-utils/device';
import { AcquiredDevice } from '@suite-types';
import ProgressBar from './ProgressBar';

interface Props {
    cachedDevice: AcquiredDevice;
}
const FirmwareInstallation = ({ cachedDevice }: Props) => {
    const { device } = useDevice();
    const { status, installingProgress } = useFirmware();
    const { goToNextStep } = useOnboarding();
    const statusIntlId = getTextForStatus(status);
    const statusText = statusIntlId ? <Translation id={statusIntlId} /> : null;
    const statusDescription = getDescriptionForStatus(status);

    return (
        <>
            {/* Modal to instruct user to disconnect the device and reconnect in normal mode */}
            {/* TODO refactor ReconnectDevicePrompt component */}
            {(status === 'unplug' || status === 'reconnect-in-normal') && (
                <ReconnectDevicePrompt
                    deviceVersion={cachedDevice?.features?.major_version || 2}
                    requestedMode="normal"
                />
            )}
            <OnboardingStepBox
                heading={<Translation id="TR_INSTALL_FIRMWARE" />}
                // innerActions={content.innerActions}
                // outerActions={content.outerActions}
                confirmOnDevice={
                    status === 'waiting-for-confirmation' ? (
                        <ConfirmOnDevice
                            title={<Translation id="TR_CONFIRM_ON_TREZOR" />}
                            trezorModel={device?.features?.major_version === 1 ? 1 : 2}
                            // successText={<Translation id="TR_CONFIRMED_TX" />}
                            // onCancel={cancelSignTx}
                        />
                    ) : undefined
                }
                outerActions={
                    status === 'done' ? (
                        // todo: this needs to be different action in separate fw flow
                        <Button
                            variant="primary"
                            onClick={() => goToNextStep()}
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
                {/* <ProgressBar label={statusText} total={100} current={10} maintainCompletedState /> */}
                {status !== 'waiting-for-confirmation' && status !== 'started' && (
                    <ProgressBar
                        label={statusText}
                        total={100}
                        current={installingProgress || 0}
                        maintainCompletedState
                    />
                )}
                {statusText && (
                    <>
                        {statusDescription && (
                            <P>
                                <Translation id={statusDescription} />
                            </P>
                        )}
                    </>
                )}
            </OnboardingStepBox>
        </>
    );
};

export default FirmwareInstallation;
export { FirmwareInstallation };
