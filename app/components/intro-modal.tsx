'use client';

import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { useUserProvider } from "../providers/user-provider";

export default function IntroModal() {
    const { login } = useUserProvider();
    const [formState, dispatch] = useFormState<{ status: boolean; } | undefined>(login, undefined);

    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (formState?.status) {
            setOpen(false);
        }
    })

    return (
        <Modal isOpen={open} closeOnOverlayClick={false} onClose={() => setOpen(false)}>
            <ModalOverlay />
            <ModalContent>

                <ModalHeader>Nice to meet you!</ModalHeader>
                <form action={dispatch}>

                    <ModalBody>
                        <FormControl>
                            <FormLabel
                                htmlFor="name"
                            >
                                What's your name?
                            </FormLabel>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel
                                htmlFor="jobTitle"
                            >
                                What's your job title?
                            </FormLabel>
                            <Input
                                id="jobTitle"
                                type="text"
                                name="jobTitle"
                                placeholder="Enter your job title"
                                required
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <SaveButton />
                    </ModalFooter>
                </form>

            </ModalContent>
        </Modal>
    )
}

function SaveButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            aria-disabled={pending}
            className='mt-4'
            disabled={pending}
            isLoading={pending}
            type="submit"
        >
            Save
        </Button>
    );
}
