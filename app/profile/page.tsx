'use client';

import AppLayout from "../components/app-layout";
import { useUserProvider } from "../providers/user-provider";

export default function Profile() {

    const { user } = useUserProvider();

    return (
        <AppLayout>
            Name - {user?.name}
            <br />
            JobTitle - {user?.jobTitle}
        </AppLayout>
    )
}
