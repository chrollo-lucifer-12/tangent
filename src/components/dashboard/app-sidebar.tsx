import { cache } from 'react'
import { createClient } from "@/utils/supabase/server"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {getFolders, getUserData} from "@/utils/supabase/queries"
import FoldersDropdown from "@/components/dashboard/folders-dropdown";

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
        return null
    }

    const {data,error} = await getFolders(workspaceId);

    return (
        <Sidebar className="bg-[#171717] w-[220px]">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[#2b2b2b]">Your workspaces</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <FoldersDropdown workspaceId={workspaceId} workspaceFolders={data ? data : []} />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex gap-4 m-4 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-pink-100 rounded-full blur bg-gradient-to-r from-[#035C76] via-[#03433D] to-[#106E45] opacity-0 group-hover:opacity-100"></div>
                        <Avatar className="hover:cursor-pointer hover:scale-110 transition duration-300 relative">
                            <AvatarImage src={user.avatarUrl} />
                        </Avatar>
                    </div>
                    <div className="flex flex-col p-2">
                        <span className="text-[#727272]">{user.fullname}</span>
                        <span className="font-light text-[12px] text-[#3f3f3f]">{user.email}</span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}