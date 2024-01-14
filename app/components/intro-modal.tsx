'use client';

import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormState, useFormStatus } from "react-dom";
import { updateUser } from "../lib/actions";
import { useEffect, useState } from "react";

type User = {
    email: string;
    name?: string;
    jobTitle?: string;
}

export default function IntroModal({ user }: { user: User }) {
    const [formState, dispatch] = useFormState(updateUser, undefined);

    const [open, setOpen] = useState(!user.name);

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
                                htmlFor="email"
                            >
                                What's your email?
                            </FormLabel>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                value={user.email}
                                readOnly
                            />
                        </FormControl>
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
