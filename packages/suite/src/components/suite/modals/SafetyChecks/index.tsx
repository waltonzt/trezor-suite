import React, { useState } from 'react';
import { useActions, useSelector } from '@suite-hooks';
import { RadioButton, H2, P, Warning } from '@trezor/components';
import { Translation, Modal, ModalProps } from '@suite-components';
import * as deviceSettingsActions from '@settings-actions/deviceSettingsActions';
import { SafetyCheckLevel } from 'trezor-connect';
import { Buttons, ConfirmButton } from '@firmware-components';
import styled from 'styled-components';

const OptionsWrapper = styled.div`
    width: 100%;
    text-align: left;
    margin: 20px 0 50px;
    & > * + * {
        margin-top: 50px;
    }
`;

const RadioButtonInner = styled.div`
    display: flex;
    flex-direction: column;
`;

const WarningWrapper = styled.div`
    margin-bottom: 18px;
`;
const SafetyChecks = (props: ModalProps) => {
    const device = useSelector(state => state.suite.device);
    const { applySettings } = useActions({ applySettings: deviceSettingsActions.applySettings });
    const [level, setLevel] = useState<SafetyCheckLevel | undefined>(
        device?.features?.safety_checks || undefined,
    );

    const ApplyButton = (
        <Buttons>
            <ConfirmButton
                onClick={() => {
                    applySettings({ safety_checks: level });
                }}
                // Only allow cofirming when the value will be changed.
                isDisabled={level === device?.features?.safety_checks}
            />
        </Buttons>
    );

    return (
        <Modal
            cancelable
            onCancel={props.onCancel}
            heading={<Translation id="TR_SAFETY_CHECKS_MODAL_TITLE" />}
            bottomBar={ApplyButton}
        >
            <OptionsWrapper>
                <RadioButton
                    value="Strict"
                    isChecked={level === 'Strict'}
                    onClick={() => setLevel('Strict')}
                >
                    <RadioButtonInner>
                        <H2>
                            <Translation id="TR_SAFETY_CHECKS_STRICT_LEVEL" />
                        </H2>
                        <P size="small">
                            <Translation id="TR_SAFETY_CHECKS_STRICT_LEVEL_DESC" />
                        </P>
                    </RadioButtonInner>
                </RadioButton>
                <RadioButton
                    value="PromptTemporarily"
                    isChecked={level === 'PromptAlways' || level === 'PromptTemporarily'}
                    onClick={() => setLevel('PromptTemporarily')}
                >
                    <RadioButtonInner>
                        <H2>
                            <Translation id="TR_SAFETY_CHECKS_PROMPT_LEVEL" />
                        </H2>
                        <WarningWrapper>
                            <Warning>
                                <Translation id="TR_SAFETY_CHECKS_PROMPT_LEVEL_WARNING" />
                            </Warning>
                        </WarningWrapper>
                        <P size="small">
                            <Translation id="TR_SAFETY_CHECKS_PROMPT_LEVEL_DESC" />
                        </P>
                    </RadioButtonInner>
                </RadioButton>
            </OptionsWrapper>
        </Modal>
    );
};

export default SafetyChecks;
