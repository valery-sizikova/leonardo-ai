'use client'

import { createContext, useContext, useState } from 'react'

type User = {
    id: string;
    name: string;
    jobTitle: string;
}

const UserContext = createContext<{ user?: User, login?: () => void; logout?: () => void; }>({});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const storedUser = window.localStorage.getItem('user');

    const [user, setUser] = useState<User | undefined>(storedUser ? JSON.parse(storedUser) : undefined);

    const login = () => {
        const newUser = { name: 'Val', jobTitle: 'Developer', id: '1' };
        window.localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    }

    const logout = () => {
        window.localStorage.removeItem('user')
        setUser(undefined);
    }

    return <UserContext.Provider value={{ user, login, logout }}>
        {children}
    </UserContext.Provider>
}

export const useUserProvider = () => {
    const context = useContext(UserContext);
    return context;
}