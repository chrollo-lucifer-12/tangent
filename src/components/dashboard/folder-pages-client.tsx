"use client"
import React, {useEffect, useState} from "react";
import {SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem} from "@/components/ui/sidebar";
import {ExternalLink, FilePlus} from "lucide-react";
import {useRouter} from "next/navigation";
import {useBearActions, usePages, useWebSocket} from "@/lib/providers/state-provider";
import {createPage, getPages} from "@/utils/supabase/queries";
import { File} from "../../lib/supabase/supabase.types";
import {v4} from "uuid"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
interface FolderPagesClientProps {
    folderId : string
    workspaceId : string
}

const FolderPagesClient : React.FC<FolderPagesClientProps> = ({ workspaceId, folderId}) => {

    const actions = useBearActions();
    const pages = usePages();
    const socket = useWebSocket();

    const [pageName, setPageName] = useState<string>("")

    useEffect(() => {
        async function fetchPage () {
            const pages = await getPages(folderId);
            actions.changePages(pages);
        }
        fetchPage();
    }, [folderId]);

useEffect(() => {

        socket?.addEventListener("message", (messageEvent) => {
            const message = JSON.parse(messageEvent.data);
            if (message.type === "add_page") {
                const newPages = [...pages, message.page];
                actions.changePages(newPages);
            }
        })
    },[socket,pages])

    const router = useRouter();

    function handleRedirect (pageId : string) {
        router.push(`/dashboard/${workspaceId}/${folderId}/${pageId}`)
    }

    async function handleCreatePage () {
        const newPage : File = {
            workspaceId,
            title: pageName,
            logo: "",
            createdAt: new Date().toISOString(),
            bannerUrl: "",
            inTrash: "",
            iconId: "",
            data: "",
            id: v4(),
            folderId
        }
        await createPage(newPage);
        socket?.send(JSON.stringify({
            type : "add_page",
            page : newPage,
            workspaceId
        }))
    }

    return (
        <SidebarMenuSub>
            {
                pages.map((page,i) => (
                    <SidebarMenuSubItem key={i} >
                        <SidebarMenuSubButton asChild className="flex justify-between">
                            <span>{page.title} <ExternalLink className="hover:text-blue-500 transition duration-200" onClick={() => handleRedirect(page.id)} /></span>
                        </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                ))
            }
            <Dialog >
                <DialogTrigger asChild>
                    <SidebarMenuSubButton>
                        <FilePlus className="mr-2" /> Add File
                    </SidebarMenuSubButton>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a New File</DialogTitle>
                    </DialogHeader>
                    <Input
                        autoFocus
                        placeholder="Enter file name..."
                        value={pageName}
                        onChange={(e) => setPageName(e.target.value)}
                    />
                    <DialogFooter>
                        <Button onClick={handleCreatePage}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarMenuSub>
    )
}

export default FolderPagesClient