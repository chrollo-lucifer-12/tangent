"use client"
import {Folder} from "@/lib/supabase/supabase.types";
import React, {useEffect, useState} from "react";
import FolderTooltip from "@/components/dashboard/folder-tooltip";
import { v4 as uuidv4 } from "uuid";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Plus} from "lucide-react";
import {useBearActions, useWorkspaceFolders} from "@/lib/providers/state-provider";
import {createFolder} from "@/utils/supabase/queries";
import {Input} from "@/components/ui/input";
interface FoldersDropdownProps {
    workspaceId : string
    workspaceFolders : Folder[]
}

const FoldersDropdown : React.FC<FoldersDropdownProps> = ({workspaceId,workspaceFolders}) => {

    const actions = useBearActions()
    const folders = useWorkspaceFolders()
    const [editingFolder, setEditingFolder] = useState<number>();
    const [folderTitles, setFolderTitles] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        actions.resetFolders();
        const titles: { [key: string]: string } = {};
        workspaceFolders.map((folder) => {
            actions.changeworkspaceFolders(folder);
            titles[folder.id] = folder.title;
        })
        setFolderTitles(titles);
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
            actions.changeworkspaceFolders(newFolder);
        }
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
                                <AccordionTrigger className="text-[#5d5d5d] hover:text-white transition duration-200">📁
                                    {
                                        editingFolder === i ? (<Input
                                            autoFocus
                                            value={folderTitles[folder.id] || ""}
                                            onChange={(e) => setFolderTitles((prev) => ({ ...prev, [folder.id]: e.target.value }))}

                                        />) : (<span onDoubleClick={() => {
                                            setEditingFolder(i)
                                        }}>{folder.title}</span>)
                                    }
                                </AccordionTrigger>
                                <AccordionContent>
                                    {/*render pages*/}
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