"use client"
import {File} from "@/lib/supabase/supabase.types";
import React from "react";
import {SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem} from "@/components/ui/sidebar";
import {ExternalLink} from "lucide-react";
import {useRouter} from "next/navigation";


interface FolderPagesClientProps {
    pages : File[],
    folderId : string
    workspaceId : string
}

const FolderPagesClient : React.FC<FolderPagesClientProps> = ({pages, workspaceId, folderId}) => {

    const router = useRouter();

    function handleRedirect (pageId : string) {
        router.push(`/dashboard/${workspaceId}/${folderId}/${pageId}`)
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
        </SidebarMenuSub>
    )
}

export default FolderPagesClient