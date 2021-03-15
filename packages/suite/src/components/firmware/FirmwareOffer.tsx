import React from 'react';
import styled from 'styled-components';
import { Icon, variables } from '@trezor/components';
import { Translation } from '@suite-components';

const FwVersionWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 16px 0px;
    border-bottom: 1px solid ${props => props.theme.STROKE_GREY};
`;

const FwVersion = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Version = styled.span<{ new?: boolean }>`
    color: ${props => (props.new ? props.theme.TYPE_GREEN : props.theme.TYPE_LIGHT_GREY)};
    font-size: ${variables.FONT_SIZE.SMALL};
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    font-variant-numeric: tabular-nums;
    margin-top: 6px;
`;

const Label = styled(Version)`
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    font-size: ${variables.FONT_SIZE.TINY};
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 80px;
`;

interface Props {
    currentVersion?: React.ReactNode;
    newVersion: React.ReactNode;
}

const FirmwareOffer = ({ currentVersion, newVersion }: Props) => {
    return (
        <FwVersionWrapper>
            {currentVersion && (
                <>
                    <FwVersion>
                        <Label>
                            <Translation id="TR_ONBOARDING_CURRENT_VERSION" />
                        </Label>
                        <Version>{currentVersion}</Version>
                    </FwVersion>
                    <IconWrapper>
                        <Icon icon="ARROW_RIGHT_LONG" size={16} />
                    </IconWrapper>
                </>
            )}
            <FwVersion>
                <Label>
                    <Translation id="TR_ONBOARDING_NEW_VERSION" />
                </Label>
                <Version new>{newVersion}</Version>
            </FwVersion>
        </FwVersionWrapper>
    );
};

export default FirmwareOffer;
export { FirmwareOffer };
