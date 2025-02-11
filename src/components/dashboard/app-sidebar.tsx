import {createClient} from "@/utils/supabase/server";
import {
    getUserSubscriptionStatus,
    getFolders,
    getPrivateWorkspaces,
    getCollaborativeWorkspaces, getSharedWorkspaces
} from "@/utils/supabase/queries";
import {redirect} from "next/navigation";
import logger from "@/lib/logger";



export async function AppSidebar({params}) {

    const {workspaceId} = await params;

    const supabase = await createClient();

    const {data : {user}} = await supabase.auth.getUser();
    if (!user) {
         return;
    }

    const {data: subscriptionData, error: subscriptionError} = await getUserSubscriptionStatus(user.id);

    const { data: workspaceFolderData, error: foldersError } = await getFolders(
        workspaceId
    );

    if (subscriptionError || foldersError) redirect('/dashboard');

    // const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    //     await Promise.all([
    //         getPrivateWorkspaces(user.id),
    //         getCollaborativeWorkspaces(user.id),
    //         getSharedWorkspaces(user.id),
    //     ]);

    const privateWorkspaces = await getPrivateWorkspaces(user.id);
    const collaboratingWorkspaces = await getCollaborativeWorkspaces(user.id);
    const sharedWorkspaces = await getSharedWorkspaces(user.id);


    return (
        <div>
            sidebar
        </div>
    )
}
