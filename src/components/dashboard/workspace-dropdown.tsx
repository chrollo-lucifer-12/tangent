"use client"

import {workspace} from "@/lib/supabase/supabase.types";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ChevronsUpDown, PlusCircleIcon} from "lucide-react";
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
import {
    Select,
    SelectContent, SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {redirect, useRouter} from "next/navigation";


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
    //const router = useRouter();

    useEffect(() => {

        actions.changePrivateWorkspaces(privateWorkspaces);


        actions.changeSharedWorkspaces(sharedWorkspaces);


        actions.changeCollaboratingWorkspaces(collaboratingWorkspaces);

    }, []);


    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const supbase = createClient();


    function getLogo(worskapceUrl: string) {
        const {data: workspaceLogo} = supbase.storage.from("logos").getPublicUrl(`${worskapceUrl}`);
        return workspaceLogo.publicUrl
    }


    return <div className="relative">
        <Select
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <div className="flex items-center space-x-2  px-4 min-w-0">
                <SelectTrigger className="focus:ring-[#3c2f55]">
                    <h4 className="text-sm font-mono font-semibold flex items-center gap-4">
                        <Image src={getLogo(selectedOption.logo)} alt="workspace logo" width={20} height={20}
                               className="rounded-full"/>
                        <p>{selectedOption?.title}</p>
                    </h4>
                </SelectTrigger>
                <Dialog>
                    <DialogTitle></DialogTitle>
                    <DialogTrigger>
                        <PlusCircleIcon className="text-[#919297] hover:text-white transition duration-200"/>
                    </DialogTrigger>
                    <DialogContent>
                        <DashboardSetup userId={userId}/>
                    </DialogContent>
                </Dialog>
            </div>

            <SelectContent className="bg-[#18181a] w-[250px]"><span
                className="text-[10px] text-[#919297] p-2 m-2">Workspaces</span>
                <SelectGroup>
                    {
                        privateStates.map((workspace, i) => (
                            <Link href={`/dashboard/${workspace.id}`} key={i}
                                  className="flex items-center text-[#919297] rounded-md gap-6 p-2 pl-6 pr-6 hover:text-white hover:bg-[#26262B] hover:ring-1 transition duration-300">
                                {/*<Image priority src={getLogo(workspace.logo)} alt="workspace logo" width={20} height={20}*/}
                                {/*       className="rounded-full"/>*/}
                                <p>{workspace?.title}</p>
                            </Link>
                        ))
                    }
                </SelectGroup>
                <SelectGroup>

                    {
                        sharedStates.map((workspace, i) => (

                            <Link href={`/dashboard/${workspace.id}`} key={i}
                                  className="flex items-center text-[#919297] rounded-md gap-6 p-2 pl-6 pr-6 hover:text-white hover:bg-[#26262B] hover:ring-1 transition duration-300">
                                {/*<Image priority src={getLogo(workspace.logo)} alt="workspace logo" width={20} height={20}*/}
                                {/*       className="rounded-full"/>*/}
                                <p>{workspace?.title}</p>
                            </Link>


                        ))
                    }
                </SelectGroup>
                <SelectGroup>

                    {
                        collaboratingStates.map((workspace, i) => (
                            <Link href={`/dashboard/${workspace.id}`} key={i}
                                  className="flex items-center text-[#919297] rounded-md gap-6 p-2 pl-6 pr-6 hover:text-white hover:bg-[#26262B] hover:ring-1 transition duration-300">
                                {/*<Image priority src={getLogo(workspace.logo)} alt="workspace logo" width={20} height={20}*/}
                                {/*       className="rounded-full"/>*/}
                                <p>{workspace?.title}</p>
                            </Link>
                        ))
                    }
                </SelectGroup>

            </SelectContent>
        </Select>
    </div>
}

export default WorkspaceDropdown