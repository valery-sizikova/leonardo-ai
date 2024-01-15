"use client";

import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useUserProvider } from "../providers/user-provider";
import { SliderActions, SliderContent, type Step } from "./ui/slider";

export default function IntroModal() {
    const { login } = useUserProvider();
    const [isOpen, setIsOpen] = useState(true);
    const onClose = useCallback(() => {
        setIsOpen(false);
    }, [])
    const [currentStep, setCurrentStep] = useState(0);

    const [formData, setFormData] = useState<{
        name: string;
        jobTitle: string;
    }>({ name: "", jobTitle: "" });

    const steps: Step<keyof typeof formData>[] = useMemo(
        () => [
            {
                name: "name",
                component: (
                    <FormControl key="1">
                        <FormLabel htmlFor="name">What&apos;s your name?</FormLabel>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            autoFocus
                            tabIndex={currentStep === 0 ? 0 : -1}
                            value={formData.name}
                            placeholder="Enter your full name"
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />
                    </FormControl>
                ),
            },
            {
                name: "jobTitle",
                component: (
                    <FormControl key="2">
                        <FormLabel htmlFor="jobTitle">What&apos;s your job title?</FormLabel>
                        <Input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            tabIndex={currentStep === 1 ? 0 : -1}
                            value={formData.jobTitle}
                            placeholder="Enter your job title"
                            onChange={(e) =>
                                setFormData({ ...formData, jobTitle: e.target.value })
                            }
                        />
                    </FormControl>
                ),
            },
        ],
        [currentStep, formData]
    );

    const [formState, setFormState] = useState(false);

    const dispatch = () => {
        login?.({ name: formData.name.trim(), jobTitle: formData.jobTitle.trim() });
        setFormState(true);
    };

    useEffect(() => {
        if (formState) {
            onClose();
        }
    }, [formState, onClose]);

    useEffect(() => {
        const currEl = document.getElementById(steps[currentStep].name);
        const timeout = setTimeout(() => {
            currEl?.focus();
        }, 500);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep]);

    const isNextStepDisabled = formData[steps[currentStep].name].trim() === "";

    return (
        <Modal
            closeOnOverlayClick={false}
            closeOnEsc={false}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Nice to meet you!</ModalHeader>
                <form>
                    <ModalBody>
                        <SliderContent steps={steps} currentStep={currentStep} />
                    </ModalBody>
                    <ModalFooter display="flex" justifyContent="space-between">
                        <SliderActions
                            steps={steps}
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                            isNextStepDisabled={isNextStepDisabled}
                            finalStepAction={
                                <Button
                                    isDisabled={isNextStepDisabled}
                                    type="submit"
                                    formAction={dispatch}
                                >
                                    Save
                                </Button>
                            }
                        />
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}
