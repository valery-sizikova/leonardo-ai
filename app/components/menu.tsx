'use client';

import { Menu as MenuComponent, MenuButton, MenuItem, MenuList, Avatar, MenuGroup, Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import IntroModal from "./intro-modal";
import { deleteUser } from "../lib/actions";
import { User } from "../lib/types";

export default function Menu({ user }: { user?: User }) {
    return !user ? <IntroModal /> : (
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
                        <MenuItem onClick={async () => {
                            await deleteUser();
                            location.reload();
                        }}>
                            Sign out
                        </MenuItem>
                    </MenuGroup>
                </MenuList>
            </MenuComponent>
        </Box>
    )
}