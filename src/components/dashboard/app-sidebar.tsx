import { cache } from 'react'
import { createClient } from "@/utils/supabase/server"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import {
    getCollaborativeWorkspaces,
    getFolders,
    getPrivateWorkspaces,
    getSharedWorkspaces,
    getUserData
} from "@/utils/supabase/queries"
import FoldersDropdown from "@/components/dashboard/folders-dropdown";
import WorkspaceDropdown from "@/components/dashboard/workspace-dropdown";
import {NavUser} from "@/components/dashboard/nav-user";
import Terminal from "@/components/dashboard/terminal";

const getCachedUser = cache(async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return null
    }

    const userData = await getUserData(user.id)
    const { data: avatar } = supabase.storage.from("logos").getPublicUrl(`${userData.avatarUrl}`)

    return {
        ...userData,
        avatarUrl: avatar.publicUrl
    }
})

export async function AppSidebar({ workspaceId }: { workspaceId: string }) {
    const user = await getCachedUser()

    if (!user) {
        //console.log("No user found, returning early")
        return <div>
            no user found
        </div>
    }

    const privateWorkspaces = await getPrivateWorkspaces(user.id);
    const collaboratingWorkspaces = await getCollaborativeWorkspaces(user.id);
    const sharedWorkspaces = await getSharedWorkspaces(user.id);

    const {data} = await getFolders(workspaceId);

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <WorkspaceDropdown privateWorkspaces={privateWorkspaces} sharedWorkspaces={sharedWorkspaces} collaboratingWorkspaces={collaboratingWorkspaces} defaultValue={[...privateWorkspaces, ...sharedWorkspaces, ...collaboratingWorkspaces]
                    .find((workspace) => workspace.id === workspaceId)} workspaceId={workspaceId} userId={user.id} />
            </SidebarHeader>
            <SidebarContent>
                <FoldersDropdown workspaceId={workspaceId} workspaceFolders={data ? data : []} />
                <Terminal/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser imageUrl={user.avatarUrl} fullname={user.fullname!} email={user.email!}/>
            </SidebarFooter>
        </Sidebar>
    )
}