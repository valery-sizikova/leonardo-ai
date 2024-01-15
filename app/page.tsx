import AppLayout from "./components/app-layout";
import EpisodesList from "./components/episodes/episodes-list";
import { getUser } from "./lib/actions";

export default async function Home() {
    const y = await getUser();

    return (
        <AppLayout user={y}>
            {y ? <EpisodesList /> : undefined}
        </AppLayout>
    )
}
