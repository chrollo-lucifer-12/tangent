import {createClient} from "@/utils/supabase/server";
import {
    getUserSubscriptionStatus,
    getFolders,
    getPrivateWorkspaces,
    getCollaborativeWorkspaces, getSharedWorkspaces
} from "@/utils/supabase/queries";
import {redirect} from "next/navigation";
import logger from "@/lib/logger";
import WorkspaceDropdown from "@/components/dashboard/workspace-dropdown";
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";

export async function AppSidebar({ workspaceId }: { workspaceId: string }) {
    console.log("AppSidebar started execution");

    const supabase = await createClient();
    console.log("Supabase client initialized");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.log("No user found, returning early");
        return null;
    }

    console.log("User found:", user.id);

    const { data: subscriptionData, error: subscriptionError } = await getUserSubscriptionStatus(user.id);
    console.log("Subscription Data Loaded:", subscriptionData, "Error:", subscriptionError);

    const { data: workspaceFolderData, error: foldersError } = await getFolders(workspaceId);
    console.log("Workspace Folder Data Loaded:", workspaceFolderData, "Error:", foldersError);

    if (subscriptionError || foldersError) {
        console.log("Error detected, returning error message");
        return <div>Error loading data</div>;
    }

    console.log("Fetching private workspaces...");
    const privateWorkspaces = await getPrivateWorkspaces(user.id);
    console.log("Private workspaces loaded:", privateWorkspaces);

    console.log("Fetching collaborative workspaces...");
    const collaboratingWorkspaces = await getCollaborativeWorkspaces(user.id);
    console.log("Collaborative workspaces loaded:", collaboratingWorkspaces);

    console.log("Fetching shared workspaces...");
    const sharedWorkspaces = await getSharedWorkspaces(user.id);
    console.log("Shared workspaces loaded:", sharedWorkspaces);


    console.log("Workspaces fetched:", {
        privateWorkspaces,
        collaboratingWorkspaces,
        sharedWorkspaces
    });

    console.log("AppSidebar finished execution");

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Your workspaces</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <WorkspaceDropdown privateWorkspaces={privateWorkspaces} sharedWorkspaces={sharedWorkspaces}
                                               collaboratingWorkspaces={collaboratingWorkspaces} defaultValue={[...privateWorkspaces, ...sharedWorkspaces, ...collaboratingWorkspaces]
                                .find((workspace) => workspace.id === workspaceId)} />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div>
                    {user.user_metadata.full_name}
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

