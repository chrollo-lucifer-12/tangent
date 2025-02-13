import {
    getPrivateWorkspaces,
    getCollaborativeWorkspaces, getSharedWorkspaces
} from "@/utils/supabase/queries";
import {createClient} from "@/utils/supabase/server";
import WorkspaceDropdown from "@/components/dashboard/workspace-dropdown";
import {SidebarTrigger} from "@/components/ui/sidebar";


const DashboardNavbar = async ({ workspaceId }: { workspaceId: string }) => {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();
    if (!user) return;
    const privateWorkspaces = await getPrivateWorkspaces(user.id);
    const collaboratingWorkspaces = await getCollaborativeWorkspaces(user.id);
    const sharedWorkspaces = await getSharedWorkspaces(user.id);

    return (
        <div className="w-full h-fit p-3 border border-b-[#202020] flex">
            <SidebarTrigger  />
            <WorkspaceDropdown userId={user.id} privateWorkspaces={privateWorkspaces} sharedWorkspaces={sharedWorkspaces}
                               collaboratingWorkspaces={collaboratingWorkspaces}
                               defaultValue={[...privateWorkspaces, ...sharedWorkspaces, ...collaboratingWorkspaces]
                                   .find((workspace) => workspace.id === workspaceId)} />
        </div>
    )
}

export default DashboardNavbar