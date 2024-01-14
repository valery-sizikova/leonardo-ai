import AppLayout from "./components/app-layout";
import EpisodesList from "./components/episodes/episodes-list";

export default async function Home() {
    return (
        <AppLayout>
            <EpisodesList />
        </AppLayout>
    )
}
