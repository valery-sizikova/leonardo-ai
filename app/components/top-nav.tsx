import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import Menu from "./menu";

export default function TopNav() {
    return (
        <div className="z-10 fixed w-full top-0 bg-white h-10 md:h-16 px-4 md:px-8 py-2 md:py-2 shadow">
            <div className="flex h-full items-center justify-between">
                <Link href="/" as={NextLink}>Home</Link>
                <Menu />
            </div>
        </div >
    )
}