import { useEffect, useState } from 'react';

const isServer = typeof window === 'undefined';

export default function useLocalStorage(key: string, initialValue?: any): [value: any, setValue: (value: any) => void, resetValue: () => void] {
    const [storedValue, setStoredValue] = useState(() => initialValue);

    const initialize = () => {
        if (isServer) {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    };

    /* prevents hydration error so that state is only initialized after server is defined */
    useEffect(() => {
        if (!isServer) {
            setStoredValue(initialize());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setValue = (value: any) => {
        try {
            const valueToStore = value;
            setStoredValue(valueToStore);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error);
        }
    };


    const resetValue = () => {
        try {
            setStoredValue(undefined);
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue, resetValue];
}