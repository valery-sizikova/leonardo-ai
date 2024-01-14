'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from './providers/user-provider'


export function Providers({ children }: { children: React.ReactNode }) {
    return <ChakraProvider><UserProvider>{children}</UserProvider></ChakraProvider>
}