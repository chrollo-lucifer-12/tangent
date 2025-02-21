
"use client"
import {workspace} from "@/lib/supabase/supabase.types";
import React, { useState} from "react";
import {ChevronsUpDown, Plus} from "lucide-react";
import {createClient} from "@/utils/supabase/client";
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
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import DashboardSetup from "@/components/dashboard/dashboard-setup";
import Image from "next/image";


interface WorkspaceDropdownProps {
    privateWorkspaces : workspace[],
    sharedWorkspaces : workspace[] | [],
    collaboratingWorkspaces : workspace[] | [],
    defaultValue : workspace | undefined,
    workspaceId : string
    userId : string
}

const WorkspaceDropdown : React.FC<WorkspaceDropdownProps> =  ({privateWorkspaces, sharedWorkspaces, collaboratingWorkspaces, defaultValue, workspaceId, userId}) => {

    const router = useRouter()

    const [openSheet, setOpenSheet] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [selectedOption] = useState(defaultValue);

    const supabase = createClient();

    function getLogo(workspaceUrl: string) {
        const { data : {publicUrl} } = supabase.storage.from("logos").getPublicUrl(`workspace/${workspaceUrl}.png`);
        return publicUrl;
    }

    const {isMobile} = useSidebar()


    return (
        <>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogTitle></DialogTitle>
                    <DashboardSetup userId={userId}/>
                </DialogContent>
            </Dialog>
            <CollaboratorsSheet openSheet={openSheet} setOpenSheet={setOpenSheet} workspaceId={workspaceId}/>
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
                                <ChevronsUpDown className="ml-auto"/>

                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                             align="start" side={isMobile ? "bottom" : "right"} sideOffset={4}>
                            <DropdownMenuLabel>
                                Workspaces
                            </DropdownMenuLabel>
                            {
                                [...privateWorkspaces, ...sharedWorkspaces, ...collaboratingWorkspaces].map((workspace, i) => (
                                    <DropdownMenuItem key={i} className="gap-2 p-2"
                                                      onClick={() => router.push(`/dashboard/${workspace.id}`)}>
                                        <div className="flex size-6 items-center justify-center rounded-sm border">
                                            <Image src={getLogo(workspace.id)} width={10} height={10} alt="ds" />
                                        </div>
                                        {workspace.title}
                                    </DropdownMenuItem>
                                ))
                            }
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="gap-2 p-2" onClick={() => {setOpenDialog(true)}} >
                                <div
                                    className="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <Plus className="size-4"/>
                                </div>
                                <div className="font-medium text-muted-foreground">Add workspace</div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 p-2" onClick={() => setOpenSheet(true)}>
                                <div
                                    className="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <Plus className="size-4"/>
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