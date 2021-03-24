import React from 'react';
import styled from 'styled-components';
import { Box, BoxProps } from '@onboarding-components';
import { Backdrop, Translation } from '@suite-components';

const OuterActions = styled.div`
    display: flex;
    margin-top: 40px;
`;

const InnerActions = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
`;

const ConfirmWrapper = styled.div`
    margin-bottom: 25px;
    z-index: 1;
`;

interface Props extends BoxProps {
    innerActions?: React.ReactNode;
    outerActions?: React.ReactNode;
    confirmOnDevice?: React.ReactNode;
}

const OnboardingStepBox = ({
    heading,
    description,
    image,
    innerActions,
    outerActions,
    confirmOnDevice,
    className,
    children,
    ...rest
}: Props) => {
    return (
        <>
            <Backdrop show={!!confirmOnDevice} animated zIndex={0} />
            {confirmOnDevice && <ConfirmWrapper>{confirmOnDevice}</ConfirmWrapper>}
            <Box
                image={image ?? 'RECOVER_FROM_SEED'}
                heading={heading}
                description={description}
                {...rest}
            >
                {(children || innerActions) && (
                    <>
                        {children}
                        {innerActions && <InnerActions>{innerActions}</InnerActions>}
                    </>
                )}
            </Box>
            {outerActions && <OuterActions>{outerActions}</OuterActions>}
        </>
    );
};

export default OnboardingStepBox;
export { OnboardingStepBox };
