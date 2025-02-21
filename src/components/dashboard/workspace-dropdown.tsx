"use client"
import {workspace} from "@/lib/supabase/supabase.types";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ChevronsUpDown, Plus, PlusCircleIcon} from "lucide-react";
import Image from "next/image";
import {createClient} from "@/utils/supabase/client";
import Link from "next/link";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import DashboardSetup from "@/components/dashboard/dashboard-setup";
import {
    useBearActions,
    useCollaboratingWorkspaces,
    usePrivateWorkspaces,
    useSharedWorkspaces
} from "@/lib/providers/state-provider";
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useRouter} from "next/navigation";
import CollaboratorsSheet from "@/components/dashboard/collaborators-sheet";


interface WorkspaceDropdownProps {
    privateWorkspaces : workspace[],
    sharedWorkspaces : workspace[] | [],
    collaboratingWorkspaces : workspace[] | [],
    defaultValue : workspace | undefined,
    userId : string,
    workspaceId : string
}

const WorkspaceDropdown : React.FC<WorkspaceDropdownProps> =  ({privateWorkspaces, sharedWorkspaces, collaboratingWorkspaces, defaultValue, userId, workspaceId}) => {

    const router = useRouter()

    const [openSheet, setOpenSheet] = useState<boolean>(false)

    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const supbase = createClient();

    function getLogo(worskapceUrl: string) {
        const {data: workspaceLogo} = supbase.storage.from("logos").getPublicUrl(`${worskapceUrl}`);
        return workspaceLogo.publicUrl
    }

    const { isMobile } = useSidebar()


    return (
    <>
        <CollaboratorsSheet openSheet={openSheet} setOpenSheet={setOpenSheet} workspaceId={workspaceId} />
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg"
                                   className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    <div
                        className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">

                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {selectedOption?.title}
                </span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />

                </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side={isMobile ? "bottom" : "right"} sideOffset={4}>
                <DropdownMenuLabel>
                    Workspaces
                </DropdownMenuLabel>
                    {
                        [...privateWorkspaces, ...sharedWorkspaces, ...collaboratingWorkspaces].map((workspace,i) => (
                            <DropdownMenuItem key={i}  className="gap-2 p-2" onClick={() => router.push(`/dashboard/${workspace.id}`)}>
                                <div className="flex size-6 items-center justify-center rounded-sm border">

                                </div>
                                {workspace.title}
                            </DropdownMenuItem>
                        ))
                    }
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="gap-2 p-2" onClick={() => setIsOpen(true)}>
                        <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                            <Plus className="size-4" />
                        </div>
                        <div className="font-medium text-muted-foreground">Add workspace</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 p-2" onClick={() => setOpenSheet(true)}>
                        <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                            <Plus className="size-4" />
                        </div>
                        <div className="font-medium text-muted-foreground">Add Members</div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
    </>)
}

export default WorkspaceDropdown