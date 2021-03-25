import React from 'react';
import styled from 'styled-components';
import { Icon, IconProps, variables } from '@trezor/components';

const Wrapper = styled.div`
    display: flex;
    padding: 24px 16px 24px 24px;
    border-radius: 5px;
    border: solid 1px ${props => props.theme.STROKE_GREY};
    align-items: center;
    width: 100%;
    cursor: pointer;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
`;

const Heading = styled.span`
    color: ${props => props.theme.TYPE_DARK_GREY};
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};
    font-size: ${variables.FONT_SIZE.NORMAL};
`;

const Description = styled.span`
    margin-top: 5px;
    color: ${props => props.theme.TYPE_LIGHT_GREY};
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    font-size: ${variables.FONT_SIZE.SMALL};
`;

const IconWrapper = styled.div`
    margin-right: 24px;
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    heading: React.ReactNode;
    description?: React.ReactNode;
    icon?: IconProps['icon'];
}

const Option = ({ icon, heading, description, ...rest }: Props) => {
    return (
        <Wrapper {...rest}>
            {icon && (
                <IconWrapper>
                    <Icon icon={icon} size={48} />
                </IconWrapper>
            )}
            <Content>
                <Heading>{heading}</Heading>
                <Description>{description}</Description>
            </Content>
        </Wrapper>
    );
};

export default Option;
