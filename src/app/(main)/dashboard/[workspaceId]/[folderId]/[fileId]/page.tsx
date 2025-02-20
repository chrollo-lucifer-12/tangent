"use client"
import React, {useEffect} from "react";
import {useParams} from "next/navigation";
import {getFileTitle, getFolderTitle, getWorkspaceTitle} from "@/utils/supabase/queries";
import {useBearActions} from "@/lib/providers/state-provider";

const Page =  () => {

    const params : {workspaceId : string, folderId : string, fileId : string} = useParams();
    const actions = useBearActions();

    useEffect(() => {
        async function setTitle () {
            Promise.all([getWorkspaceTitle(params.workspaceId), getFolderTitle(params.folderId), getFileTitle(params.fileId)]).then(([workspaceTitle, folderTitle, fileTitle]) => {
                actions.setWorkspaceName(workspaceTitle)
                actions.setFolderName(folderTitle)
                actions.setPageName(fileTitle)
            });
        }
        setTitle()
    }, []);

    return <div>
        file
        {/*<QuillEditor fileId={fileId} folderId={folderId} workspaceId={workspaceId} socket = {socket} />*/}
        {/*<FlowEditor/>*/}
    </div>
}

export default Page