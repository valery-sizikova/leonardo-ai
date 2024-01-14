import { PropsWithChildren } from "react";
import TopNav from "./top-nav";

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <>
            <TopNav />
            <main className="flex min-h-screen pt-16 pb-8 px-8 md:pt-24 md:pb-16 md:px-16">
                {children}
            </main>
        </>
    )
}
