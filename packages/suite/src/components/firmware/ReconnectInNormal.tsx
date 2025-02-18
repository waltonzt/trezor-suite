import React from 'react';
import { DisconnectImg, ConnectInNormalImg, P, H2 } from '@firmware-components';
import { useDevice, useFirmware, useSelector } from '@suite-hooks';
import { Translation, WebusbButton } from '@suite-components';
import { isWebUSB } from '@suite-utils/transport';

const Heading = () => 'Reconnect device as usual';

const Body = () => {
    const { device } = useDevice();
    const { prevDevice } = useFirmware();
    const expectedModel = prevDevice?.features?.major_version;

    if (!device?.connected) {
        return (
            <>
                <ConnectInNormalImg />

                <H2>
                    <Translation id="TR_RECONNECT_YOUR_DEVICE" />
                </H2>
                {expectedModel === 1 && (
                    <P>
                        <Translation id="FIRMWARE_CONNECT_IN_NORMAL_MODEL_1" />
                    </P>
                )}
                {expectedModel === 2 && (
                    <P>
                        <Translation id="FIRMWARE_CONNECT_IN_NORMAL_MODEL_1" />
                    </P>
                )}
            </>
        );
    }

    if (device.mode === 'bootloader') {
        return (
            <>
                <DisconnectImg />
                <H2 data-test="@firmware/disconnect-message">
                    <Translation id="TR_DISCONNECT_YOUR_DEVICE" />
                </H2>
                <P>
                    <Translation id="TR_CONNECTED_DEVICE_IS_IN_BOOTLOADER" />
                </P>
            </>
        );
    }

    // seedless, initialize. but it should never happen
    if (device.mode !== 'normal') {
        return (
            <>
                <H2>
                    <Translation id="TR_DISCONNECT_YOUR_DEVICE" />
                </H2>
                <P>
                    <Translation id="TR_DEVICE_IS_IN_UNEXPECTED_MODE" />
                </P>
            </>
        );
    }

    // device is connected
    return null;
};

const BottomBar = () => {
    const transport = useSelector(state => state.suite.transport);
    if (isWebUSB(transport)) {
        return <WebusbButton variant="tertiary" />;
    }
    return null;
};

export const ReconnectInNormalStep = {
    Heading,
    Body,
    BottomBar,
};
