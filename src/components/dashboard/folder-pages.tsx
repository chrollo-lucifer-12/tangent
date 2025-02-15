"use client"
import {createPage, getPages, revalidateDashboard} from "@/utils/supabase/queries";
import { useEffect} from "react";
import {useBearActions, usePages} from "@/lib/providers/state-provider";
import {File} from "@/lib/supabase/supabase.types";
import {v4 as uuidv4} from "uuid";
import { ScrollArea } from "@/components/ui/scroll-area"
import {Separator} from "@/components/ui/separator";
import {PlusIcon} from "lucide-react";


const FolderPages =  ({folderId, workspaceId} : {folderId : string,workspaceId : string}) => {
    const actions = useBearActions()
    const pages = usePages();

    useEffect(() => {
        async function getFiles() {
            const files = await getPages(folderId);
            actions.changePages(files)
        }
        getFiles();
    }, [folderId])


    async function handleCreatePage() {
        const newFile: File = {
            id: uuidv4(),
            folderId: folderId,
            title: "New Page",
            data: "",
            iconId: "",
            inTrash: "",
            bannerUrl: "",
            workspaceId: workspaceId,
            createdAt: new Date().toISOString(),
            logo: ""
        }
        await createPage(newFile);
        await revalidateDashboard();
        const updatedFiles = await getPages(folderId);
        actions.changePages(updatedFiles);
    }

    return <ScrollArea className="h-72 w-full">
        <div className="p-4">
            <div className="flex justify-between">
                <h4 className="mb-4 text-sm font-medium leading-none">Pages</h4>
                <PlusIcon className="hover:cursor-pointer" onClick={handleCreatePage} />
            </div>
            {pages.map((page, i) => (
                <div key={i}>
                    <div className="text-sm">
                        {page.title}
                    </div>
                    <Separator className="my-2"/>
                </div>
            ))}
        </div>
    </ScrollArea>
}
export default FolderPages