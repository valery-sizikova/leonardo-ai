'use client'

import { createContext, useContext } from 'react'
import useLocalStorage from '../utils/hooks/use-local-storage';

type User = {
    name: string;
    jobTitle: string;
}

const UserContext = createContext<{ user?: User, login?: (u: User) => void; updateUser?: any; logout?: () => void; }>({});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser, resetUser] = useLocalStorage('user');

    const login = (
        userToLogin: User
    ) => {
        if (!userToLogin.name || !userToLogin.jobTitle) {
            return { status: false };
        }
        const newUser: User = {
            name: userToLogin.name,
            jobTitle: userToLogin.jobTitle
        }
        setUser(newUser);
        return { status: true };
    }

    const updateUser = (
        prevState: { status: boolean; error?: string; } | undefined,
        formData: FormData
    ) => {
        if (!user) {
            return { status: false };
        }
        const name = formData.get('name')?.toString().trim();
        const jobTitle = formData.get('jobTitle')?.toString().trim();
        if (!name || !jobTitle) {
            return { status: false };
        }
        const updatedUser: User = {
            name,
            jobTitle
        }
        setUser(updatedUser);
        return { status: true };
    }

    const logout = () => {
        resetUser();
    }

    return <UserContext.Provider value={{ user, login, logout, updateUser }}>
        {children}
    </UserContext.Provider>
}

export const useUserProvider = () => {
    const context = useContext(UserContext);
    return context;
}