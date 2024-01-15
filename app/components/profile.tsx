'use client';

import { useFormStatus } from "react-dom";
import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { User } from "../lib/types";
import { updateUser } from "../lib/actions";

export default function Profile({ user }: { user?: User }) {
    const onSubmit = (formData: FormData) => {
        updateUser(undefined, formData)
    }

    if (!user) {
        return null;
    }

    return (
        <form action={onSubmit}>
            <Flex direction='column' gap={6}>
                <Flex direction='column' gap={4}>
                    <FormControl>
                        <FormLabel
                            htmlFor="name"
                        >
                            Name
                        </FormLabel>
                        <Input
                            autoFocus
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            required
                            defaultValue={user.name}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel
                            htmlFor="jobTitle"
                        >
                            Job Title
                        </FormLabel>
                        <Input
                            id="jobTitle"
                            type="text"
                            name="jobTitle"
                            placeholder="Enter your job title"
                            required
                            defaultValue={user.jobTitle}
                        />
                    </FormControl>
                </Flex>
                <SaveButton />
            </Flex>
            {/* TODO: add submission feedback here: a green tick if save successfully or display an error */}
        </form>
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
