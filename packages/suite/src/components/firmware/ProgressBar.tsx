import React, { useEffect, useState } from 'react';
import { Icon, variables } from '@trezor/components';
import styled from 'styled-components';
import { useTheme } from '@suite-hooks';

const Wrapper = styled.div`
    display: flex;
    background: ${props => props.theme.BG_GREY};
    border-radius: 8px;
    padding: 20px 24px;
    width: 100%;
    font-size: ${variables.FONT_SIZE.SMALL};
    color: ${props => props.theme.TYPE_LIGHT_GREY};
    align-items: center;
`;

const Label = styled.div`
    display: flex;
    margin-right: 20px;
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
`;
const LineWrapper = styled.div`
    display: flex;
    margin-right: 20px;
    border-radius: 5px;
    background: ${props => props.theme.STROKE_GREY_ALT};
    flex: 1;
    height: 3px;
`;
const Percentage = styled.div`
    display: flex;
    margin-left: 10px;
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};
`;
const GreenLine = styled.div<{ width: number }>`
    background: ${props => props.theme.TYPE_GREEN};
    width: ${props => props.width}%;
    z-index: 3;
    transition: all 0.8s;

    height: 3px;
    position: relative;
    border-radius: 5px;
`;

interface Props {
    total: number;
    current: number;
    label: React.ReactNode;
    maintainCompletedState?: boolean;
}

const ProgressBar = ({ label, total, current, maintainCompletedState }: Props) => {
    const progress = (100 / total) * current;
    const [storedProgress, setStoreProgress] = useState(0);
    const { theme } = useTheme();

    useEffect(() => {
        if (progress > storedProgress) {
            setStoreProgress(progress);
        }
    }, [progress, storedProgress]);

    return (
        <Wrapper>
            <Label>{label}</Label>
            <LineWrapper>
                <GreenLine width={maintainCompletedState ? storedProgress : progress} />
            </LineWrapper>
            <Percentage>
                {progress < 100 ? (
                    `${progress} %`
                ) : (
                    <Icon icon="CHECK" color={theme.TYPE_GREEN} size={24} />
                )}
            </Percentage>
        </Wrapper>
    );
};

export default ProgressBar;
