"use client"
import {Folder} from "@/lib/supabase/supabase.types";
import { toast } from "sonner";
import React, {useEffect, useState} from "react";
import {ChevronRight} from "lucide-react";
import {useBearActions, useWebSocket, useWorkspaceFolders} from "@/lib/providers/state-provider";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import FolderPagesClient from "@/components/dashboard/folder-pages-client";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {createFolder} from "@/utils/supabase/queries";
interface FoldersDropdownProps {
    workspaceId : string
    workspaceFolders : Folder[]
}
import {v4} from "uuid"
const FoldersDropdown : React.FC<FoldersDropdownProps> = ({workspaceId,workspaceFolders}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [folderName, setFolderName] = useState<string>("")

    const actions = useBearActions();
    const folders = useWorkspaceFolders();
    const socket = useWebSocket();

    useEffect(() => {
        async function getFolder () {
            actions.changeworkspaceFolders(workspaceFolders);
        }
        getFolder();
    },[workspaceFolders])

    useEffect(() => {
        socket?.addEventListener("message", (messageEvent) => {
            const message = JSON.parse(messageEvent.data);
            if (message.type === "add_folder") {
                const newFolders = [...folders, message.folder];
                console.log(newFolders);
                actions.changeworkspaceFolders(newFolders);
            }
        })
    },[socket, folders])

    async function handleAddFolder () {
        const newFolder : Folder = {
            data: "",
            iconId: "",
            inTrash: "",
            bannerUrl: "",
            createdAt: new Date().toISOString(),
            logo: "",
            title: folderName,
            workspaceId: workspaceId,
            id : v4()
        }
        await createFolder(newFolder)
        socket?.send(JSON.stringify({
            type : "add_folder",
            folder : newFolder,
            workspaceId
        }))
        setIsOpen(false);
    }

    return (
        <>
            <Dialog open={isOpen}>
                <DialogContent>
                    <DialogTitle>Add Folder</DialogTitle>
                    <Input value={folderName} onChange={(e) => {setFolderName(e.target.value)}} />
                    <Button onClick={handleAddFolder} >Create</Button>
                </DialogContent>
            </Dialog>
        <SidebarGroup>
            <SidebarGroupLabel>Folders</SidebarGroupLabel>
            <SidebarMenu>
                {
                    folders.map((folder, i) => (
                        <Collapsible key={i} asChild className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={folder.title}>
                                        <span>{folder.title}</span>
                                        <ChevronRight
                                            className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <FolderPagesClient folderId={folder.id} workspaceId={workspaceId}/>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))
                }
            </SidebarMenu>
            <div className="p-2">
                <SidebarMenuButton onClick={() => setIsOpen(true)}>
                    + Add Folder
                </SidebarMenuButton>
            </div>
        </SidebarGroup>
        </>
    )
}

export default FoldersDropdown