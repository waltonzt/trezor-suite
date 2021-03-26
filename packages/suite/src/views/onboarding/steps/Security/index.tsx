import React from 'react';
import { Translation } from '@suite-components';
import { OnboardingLayout } from '@onboarding-components';
import { useOnboarding } from '@suite-hooks';
import { OnboardingStepBox } from '@suite/components/firmware';
import { Button } from 'packages/components/lib';

const SecurityStep = () => {
    const { goToNextStep, goToStep } = useOnboarding();

    return (
        <OnboardingLayout activeStep={1}>
            <OnboardingStepBox
                heading={<Translation id="TR_SECURITY_HEADING" />}
                description={<Translation id="TR_SECURITY_SUBHEADING" />}
                innerActions={
                    <Button
                        data-test="@onboarding/continue-to-security-button"
                        onClick={() => {
                            goToNextStep();
                        }}
                    >
                        <Translation id="TR_GO_TO_SECURITY" />
                    </Button>
                }
                outerActions={
                    <Button
                        variant="tertiary"
                        icon="CROSS"
                        data-test="@onboarding/exit-app-button"
                        // TODO
                        // onClick={() => goToStep('coins')}
                    >
                        <Translation id="TR_SKIP_SECURITY" />
                    </Button>
                }
            />
        </OnboardingLayout>
    );
};

export default SecurityStep;
