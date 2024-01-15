import { PropsWithChildren } from "react";
import TopNav from "./top-nav";
import { User } from "../lib/types";

export default function AppLayout({ children, user }: PropsWithChildren & { user?: User }) {
    return (
        <>
            <TopNav user={user} />
            <main className="flex min-h-screen pt-16 pb-8 px-8 md:pt-24 md:pb-16 md:px-16">
                {children}
            </main>
        </>
    )
}
