import { Box, Button, Flex } from "@chakra-ui/react";
import { Key, ReactElement, useCallback } from "react";

export type Step<T extends Key | null | undefined> = {
    name: T;
    component: ReactElement;
};

export function SliderContent<T extends Key | null | undefined>({
    steps,
    currentStep,
}: {
    steps: Step<T>[];
    currentStep: number;
}) {
    return (
        <Flex gap={4} position="relative" height="200" overflow="hidden">
            {steps.map((step, i) => {
                return (
                    <Box
                        key={step.name}
                        flexShrink={0}
                        padding={4}
                        className="w-full"
                        height={200}
                        left={currentStep === i ? 0 : `calc(${i - currentStep} * 100%)`}
                        transition="left 0.5s"
                        position="absolute"
                    >
                        {step.component}
                    </Box>
                );
            })}
        </Flex>
    );
}

export function SliderActions<T extends Key | null | undefined>({
    steps,
    currentStep,
    setCurrentStep,
    finalStepAction,
    isNextStepDisabled,
}: {
    steps: Step<T>[];
    currentStep: number;
    setCurrentStep: (v: number) => void;
    finalStepAction: ReactElement;
    isNextStepDisabled?: boolean;
}) {
    const onBack = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep, setCurrentStep]);

    const onNext = useCallback(() => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    }, [currentStep, setCurrentStep, steps.length]);

    return (
        <>
            <Box>
                {currentStep !== 0 ? (
                    <Button onClick={onBack} variant="ghost">
                        {"<-"}
                    </Button>
                ) : null}
            </Box>
            {currentStep === steps.length - 1 ? (
                finalStepAction
            ) : (
                <Button isDisabled={isNextStepDisabled} onClick={onNext}>
                    Next
                </Button>
            )}
        </>
    );
}

