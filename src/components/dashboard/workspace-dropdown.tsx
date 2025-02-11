"use client"

import {workspace} from "@/lib/supabase/supabase.types";
import React, {useState} from "react";
import SelectedWorkspace from "@/components/dashboard/selected-workspace";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface WorkspaceDropdownProps {
    privateWorkspaces : workspace[],
    sharedWorkspaces : workspace[] | [],
    collaboratingWorkspaces : workspace[] | [],
    defaultValue : workspace | undefined
}

const WorkspaceDropdown : React.FC<WorkspaceDropdownProps> = ({privateWorkspaces, sharedWorkspaces, collaboratingWorkspaces, defaultValue}) => {


    const [selectedOption, setSelectedOption] = useState(defaultValue);

    return <div>
        <DropdownMenu>
            <DropdownMenuTrigger><SelectedWorkspace workspace={selectedOption!}/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Private</DropdownMenuLabel>
                {
                    privateWorkspaces.map((workspace,i) => (
                        <p key={i}>{workspace.title}</p>
                    ))
                }
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Shared</DropdownMenuLabel>
                {
                    sharedWorkspaces.map((workspace,i) => (
                        <p key={i}>{workspace.title}</p>
                    ))
                }
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Collaborative</DropdownMenuLabel>
                {
                    sharedWorkspaces.map((workspace,i) => (
                        <p key={i}>{workspace.title}</p>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>


    </div>
}

export default WorkspaceDropdown