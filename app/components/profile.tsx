'use client';

import { useFormState, useFormStatus } from "react-dom";
import { useUserProvider } from "../providers/user-provider";
import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function Profile() {
    const { user, updateUser } = useUserProvider();

    const [formState, dispatch] = useFormState<{ status: boolean; } | undefined>(updateUser, undefined);

    if (!user) {
        return null;
    }

    return (
        <form action={dispatch}>
            <Flex direction='column' gap={6}>
                <Flex direction='column' gap={4}>
                    <FormControl>
                        <FormLabel
                            htmlFor="name"
                        >
                            Name
                        </FormLabel>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            required
                            defaultValue={user?.name}
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
                            defaultValue={user?.jobTitle}
                        />
                    </FormControl>
                </Flex>
                <SaveButton />
            </Flex>
        </form>
    )
}

export function SaveButton() {
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
