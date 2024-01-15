'use client'

import { createContext, useContext, useState } from 'react'

type User = {
    name: string;
    jobTitle: string;
}

const UserContext = createContext<{ user?: User, login?: (u: User) => void; updateUser?: any; logout?: () => void; }>({});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const storedUser = typeof window !== 'undefined' ? window.localStorage.getItem('user') : undefined;

    const [user, setUser] = useState<User | undefined>(storedUser ? JSON.parse(storedUser) : undefined);

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
        if (typeof window !== 'undefined') window.localStorage.setItem('user', JSON.stringify(newUser));
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
        if (typeof window !== 'undefined') window.localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { status: true };
    }

    const logout = () => {
        if (typeof window !== 'undefined') window.localStorage.removeItem('user')
        setUser(undefined);
    }

    return <UserContext.Provider value={{ user, login, logout, updateUser }}>
        {children}
    </UserContext.Provider>
}

export const useUserProvider = () => {
    const context = useContext(UserContext);
    return context;
}