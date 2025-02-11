import {createClient} from "@/utils/supabase/server";
import {
    getUserSubscriptionStatus,
    getFolders,
    getPrivateWorkspaces,
    getCollaborativeWorkspaces, getSharedWorkspaces, getUserData
} from "@/utils/supabase/queries";
import WorkspaceDropdown from "@/components/dashboard/workspace-dropdown";
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu
} from "@/components/ui/sidebar";
import Image from "next/image";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

export async function AppSidebar({ workspaceId }: { workspaceId: string }) {

    const supabase = await createClient();


    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.log("No user found, returning early");
        return null;
    }

    const {fullname, email, avatarUrl} = await getUserData(user.id);
    const {data : avatar} = supabase.storage.from("logos").getPublicUrl(`${avatarUrl}`);

    const { data: subscriptionData, error: subscriptionError } = await getUserSubscriptionStatus(user.id);


    const { data: workspaceFolderData, error: foldersError } = await getFolders(workspaceId);


    if (subscriptionError || foldersError) {

        return <div>Error loading data</div>;
    }


    const privateWorkspaces = await getPrivateWorkspaces(user.id);



    const collaboratingWorkspaces = await getCollaborativeWorkspaces(user.id);



    const sharedWorkspaces = await getSharedWorkspaces(user.id);


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
                <div className="flex gap-4 m-4 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-pink-100 rounded-full blur bg-gradient-to-r from-[#035C76] via-[#03433D] to-[#106E45] opacity-0 group-hover:opacity-100"></div>
                    <Avatar className="hover:cursor-pointer hover:scale-110 transition duration-300 relative">
                        <AvatarImage src={avatar.publicUrl} />
                    </Avatar>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#727272]">{fullname}</span>
                        <span className="font-light text-[#3f3f3f]">{email}</span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

