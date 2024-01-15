import AppLayout from "../components/app-layout";
import Profile from "../components/profile";
import { getUser } from "../lib/actions";

export default async function ProfilePage() {
    const y = await getUser();

    return (
        <AppLayout user={y}>
            <Profile user={y} />
        </AppLayout>
    )
}
