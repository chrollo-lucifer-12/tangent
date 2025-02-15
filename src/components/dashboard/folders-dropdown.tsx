"use client"
import {Folder, File} from "@/lib/supabase/supabase.types";
import React, {useEffect, useState} from "react";
import FolderTooltip from "@/components/dashboard/folder-tooltip";
import { v4 as uuidv4 } from "uuid";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {Plus} from "lucide-react";
import {useBearActions, useWorkspaceFolders} from "@/lib/providers/state-provider";
import {createFolder, renameFolder, revalidateDashboard} from "@/utils/supabase/queries";
import {Input} from "@/components/ui/input";
import FolderPages from "@/components/dashboard/folder-pages";
import {revalidatePath} from "next/cache";
interface FoldersDropdownProps {
    workspaceId : string
    workspaceFolders : Folder[]
}

const FoldersDropdown : React.FC<FoldersDropdownProps> = ({workspaceId,workspaceFolders}) => {
    const actions = useBearActions()
    const folders = useWorkspaceFolders()
    const [editingFolder, setEditingFolder] = useState<string | null>();
    const [folderTitles, setFolderTitles] = useState<{ [key: string]: string }>({});
    const [selectedFolder, setSelectedFolder] = useState<string | null>();

    useEffect(() => {
        actions.changeworkspaceFolders(workspaceFolders)
    }, [workspaceId, workspaceFolders])

    async function handleClick() {
        const newFolder: Folder = {
            id: uuidv4(),
            title: "New folder",
            logo: "",
            createdAt: new Date().toISOString(),
            workspaceId: workspaceId,
            bannerUrl: "",
            inTrash: "",
            iconId: "",
            data: ""
        }
        const {data, error} = await createFolder(newFolder);
        if (!error) {
            await revalidateDashboard();
        }
    }

    async function handleNameChange() {
        if (!editingFolder) return;
        setEditingFolder(null);
        await renameFolder(editingFolder, folderTitles[editingFolder]);
        await revalidateDashboard();
    }


    return (
        <div className="flex flex-col w-full items-center  gap-6 h-fit rounded-md sticky mt-2">
            <div className="flex justify-between w-full items-center rounded-md p-1 hover:bg-[#0C0A09]">
                <span className="text-[#919297]">Folders</span>
                <FolderTooltip message="create folder">
                    <Plus className="text-[#919297] hover:text-white transition duration-200" onClick={handleClick}/>
                </FolderTooltip>
            </div>
            <div className="w-full gap-2 h-fit">
                {
                    folders.map((folder, i) => (
                        <Accordion type="multiple" key={i}>
                            <AccordionItem value="item-1">
                                <AccordionTrigger
                                    className="text-[#5d5d5d] hover:text-white transition duration-200 hover:no-underline"
                                    onClick={() => {
                                        if (selectedFolder === folder.id) {
                                            setSelectedFolder(null);
                                        } else {
                                            setSelectedFolder(folder.id)
                                        }
                                    }}>📁
                                    {
                                        editingFolder === folder.id ? (<Input
                                            autoFocus
                                            value={folderTitles[folder.id] || ""}
                                            onChange={(e) => setFolderTitles((prev) => ({
                                                ...prev,
                                                [folder.id]: e.target.value
                                            }))}
                                            onBlur={() => {
                                                setEditingFolder(null)
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleNameChange()
                                                }
                                            }}
                                        />) : (

                                            <span className={`${selectedFolder === folder.id && "text-white"}`}
                                                  onDoubleClick={() => {
                                                      setEditingFolder(folder.id)
                                                  }}>{folder.title}</span>
                                        )
                                    }
                                </AccordionTrigger>
                                <AccordionContent>
                                    <FolderPages folderId={selectedFolder!} workspaceId={workspaceId}/>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))
                }
            </div>
        </div>
    )
}

export default FoldersDropdown