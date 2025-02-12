import {createClient} from "@/utils/supabase/server";
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu
} from "@/components/ui/sidebar";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {getUserData} from "@/utils/supabase/queries";

export async function AppSidebar() {

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.log("No user found, returning early");
        return null;
    }

    const {fullname, email, avatarUrl} = await getUserData(user.id);
    const {data : avatar} = supabase.storage.from("logos").getPublicUrl(`${avatarUrl}`);


    return (
        <Sidebar className="bg-[#171717]">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[#2b2b2b]">Your workspaces</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>

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

