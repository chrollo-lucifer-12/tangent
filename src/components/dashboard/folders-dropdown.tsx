import {Folder} from "@/lib/supabase/supabase.types";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import {ChevronRight} from "lucide-react";
import {useBearActions, useWorkspaceFolders} from "@/lib/providers/state-provider";
import {createFolder, renameFolder, revalidateDashboard} from "@/utils/supabase/queries";
import {Input} from "@/components/ui/input";
import FolderPages from "@/components/dashboard/folder-pages";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
interface FoldersDropdownProps {
    workspaceId : string
    workspaceFolders : Folder[]
}

const FoldersDropdown : React.FC<FoldersDropdownProps> = ({workspaceId,workspaceFolders}) => {

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Folders</SidebarGroupLabel>
            <SidebarMenu>
                {
                    workspaceFolders.map((folder,i) => (
                        <Collapsible key={i} asChild className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={folder.title} >
                                        <span>{folder.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <FolderPages folderId={folder.id} workspaceId={workspaceId}/>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))
                }
            </SidebarMenu>
        </SidebarGroup>
    )
}

export default FoldersDropdown