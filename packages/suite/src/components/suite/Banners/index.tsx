import * as React from 'react';
import styled from 'styled-components';

import { Message } from '@suite-types/messageSystem';
import { isDesktop } from '@suite-utils/env';
import { useSelector } from '@suite-hooks';
import OnlineStatus from './OnlineStatus';
import UpdateBridge from './UpdateBridge';
import UpdateFirmware from './UpdateFirmware';
import NoBackup from './NoBackup';
import FailedBackup from './FailedBackup';

const Wrapper = styled.div`
    z-index: 3;
    background: ${props => props.theme.BG_WHITE};
`;

const Banners = () => {
    const transport = useSelector(state => state.suite.transport);
    const online = useSelector(state => state.suite.online);
    const device = useSelector(state => state.suite.device);

    const showUpdateBridge = () => {
        if (
            isDesktop() &&
            transport?.version &&
            ['2.0.27', '2.0.28', '2.0.29'].includes(transport.version)
        ) {
            return false;
        }
        return transport?.outdated;
    };

    let banner;
    if (device?.features?.unfinished_backup) {
        banner = <FailedBackup />;
    } else if (device?.features?.needs_backup) {
        banner = <NoBackup />;
    } else if (showUpdateBridge()) {
        banner = <UpdateBridge />;
    } else if (
        device?.connected &&
        device?.features &&
        device?.mode !== 'bootloader' &&
        ['outdated'].includes(device.firmware)
    ) {
        banner = <UpdateFirmware />;
    }

    return (
        <Wrapper>
            <OnlineStatus isOnline={online} />
            {banner}
            {/* TODO: add Pin not set */}
        </Wrapper>
    );
};

export default Banners;
