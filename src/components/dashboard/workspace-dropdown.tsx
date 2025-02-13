"use client"

import {workspace} from "@/lib/supabase/supabase.types";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {Button} from "@/components/ui/button";
import {ChevronsUpDown} from "lucide-react";
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


interface WorkspaceDropdownProps {
    privateWorkspaces : workspace[],
    sharedWorkspaces : workspace[] | [],
    collaboratingWorkspaces : workspace[] | [],
    defaultValue : workspace | undefined,
    userId : string
}

const WorkspaceDropdown : React.FC<WorkspaceDropdownProps> =  ({privateWorkspaces, sharedWorkspaces, collaboratingWorkspaces, defaultValue, userId}) => {
    const actions = useBearActions()
    const privateStates = usePrivateWorkspaces();
    const sharedStates = useSharedWorkspaces()
    const collaboratingStates = useCollaboratingWorkspaces();

    useEffect(() => {
        actions.resetWorkspaces();
        privateWorkspaces.map((w) => {
            actions.changePrivateWorkspaces(w);
        })
        sharedWorkspaces.map((w) => {
            actions.changeSharedWorkspaces(w);
        })
        collaboratingWorkspaces.map((w) => {
            actions.changeCollaboratingWorkspaces(w);
        })
    }, []);



    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const supbase = createClient();


    function getLogo(worskapceUrl: string) {
        const {data: workspaceLogo} = supbase.storage.from("logos").getPublicUrl(`${worskapceUrl}`);
        return workspaceLogo.publicUrl
    }


    return <div className="relative">
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-[250px] space-y-2"
        >
            <div className="flex items-center justify-between space-x-4 px-4 min-w-0">
                <h4 className="text-sm font-mono font-semibold flex items-center gap-2">
                    <Image src={getLogo(selectedOption.logo)} alt="workspace logo" width={20} height={20}
                           className="rounded-full"/>
                    <p>{selectedOption?.title}</p>
                </h4>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm"
                            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        <ChevronsUpDown className="h-4 w-4"/>
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2 absolute z-50 w-[250px] transition-all duration-300 ease-in-out">
                <div className="transform transition-all duration-300 ease-in-out">
                    {
                        privateStates.map((workspace, i) => (
                            <Link href={`${workspace.id}`} key={i}
                                  className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex flex-row  items-center gap-2">
                                <Image priority src={getLogo(workspace.logo)} alt="workspace logo" width={20} height={20}
                                       className="rounded-full"/>
                                <p>{workspace?.title}</p>
                            </Link>
                        ))
                    }
                    {
                        sharedStates.map((workspace, i) => (
                            <Link href={`${workspace.id}`} key={i}
                                  className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex flex-row  items-center gap-2">
                                <Image priority src={getLogo(workspace.logo)} alt="workspace logo" width={20} height={20}
                                       className="rounded-full"/>
                                <p>{workspace?.title}</p>
                            </Link>
                        ))
                    }
                    {
                        collaboratingStates.map((workspace, i) => (
                            <Link href={`${workspace.id}`} key={i}
                                  className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex flex-row  items-center gap-2">
                                <Image priority src={getLogo(workspace.logo)} alt="workspace logo" width={20} height={20}
                                       className="rounded-full"/>
                                <p>{workspace?.title}</p>
                            </Link>
                        ))
                    }
                    <Dialog>
                        <DialogTitle></DialogTitle>
                        <DialogTrigger className="glow:text-glow/[.0.15]">
                                Create Workspace
                        </DialogTrigger>
                        <DialogContent >
                            <DashboardSetup userId={userId}/>
                        </DialogContent>
                    </Dialog>
                </div>
            </CollapsibleContent>
        </Collapsible>
    </div>
}

export default WorkspaceDropdown