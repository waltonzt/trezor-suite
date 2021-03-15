import React from 'react';
import { ConfirmOnDevice } from '@trezor/components';
import { getTextForStatus, getDescriptionForStatus } from '@firmware-utils';
import { Translation } from '@suite-components';
import { Loaders } from '@onboarding-components';
import { useDevice, useFirmware } from '@suite-hooks';
import { P, H2, FirmwareOffer } from '@firmware-components';
import FirmwareStepBox from '@suite/views/onboarding/steps/Firmware/components/FirmwareStepBox';
import { getFwUpdateVersion } from '@suite-utils/device';

interface Props {
    cachedCurrentFwVersion: string | undefined;
}
const NeueFirmwareProgressStep = ({ cachedCurrentFwVersion }: Props) => {
    const { device } = useDevice();
    const { status } = useFirmware();

    const statusText = getTextForStatus(status);
    const statusDescription = getDescriptionForStatus(status);

    return (
        <FirmwareStepBox
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
        >
            <FirmwareOffer
                currentVersion={cachedCurrentFwVersion}
                newVersion={device?.features ? getFwUpdateVersion(device) : 'n/a'}
            />
            {statusText && (
                <>
                    <H2>
                        <Translation id={statusText} />
                        <Loaders.Dots />
                    </H2>
                    {statusDescription && (
                        <P>
                            <Translation id={statusDescription} />
                        </P>
                    )}
                </>
            )}
        </FirmwareStepBox>
    );
};

export default NeueFirmwareProgressStep;
export { NeueFirmwareProgressStep };
