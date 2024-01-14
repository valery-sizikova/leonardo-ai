'use client';

import { Menu as MenuComponent, MenuButton, MenuItem, MenuList, Avatar, MenuGroup, Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useUserProvider } from "../providers/user-provider";

export default function Menu() {
    const { user, login, logout } = useUserProvider();

    return !user ? <Button onClick={login}>Login</Button> : (
        <Box>
            <MenuComponent>
                <MenuButton type="button" _focus={{ boxShadow: 'outline' }}>
                    <Avatar size="sm" name={user?.name} />
                </MenuButton>
                <MenuList>
                    <MenuGroup title={user?.name}>
                        <NextLink href={"/profile"}>
                            <MenuItem>
                                Profile
                            </MenuItem>
                        </NextLink>
                        <MenuItem onClick={logout}>
                            Sign out
                        </MenuItem>
                    </MenuGroup>
                </MenuList>
            </MenuComponent>
            {/* {session?.user && <IntroModal user={{ email: session.user.email ?? '', name: session.user.name ?? '', jobTitle: session.user.jobTitle ?? '' }} />} */}
        </Box>
    )
}