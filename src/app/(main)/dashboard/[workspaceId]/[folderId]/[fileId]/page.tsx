"use client"
import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {getCollaborators, getFileTitle, getFolderTitle, getWorkspaceTitle} from "@/utils/supabase/queries";
import {useBearActions, usePage, useWebSocket} from "@/lib/providers/state-provider";
import useSocket from "@/hooks/use-socket";
import QuillEditor from "@/components/quill-editor/quill-editor";
import {Input} from "@/components/ui/input";
import {createClient} from "@/utils/supabase/client";

const Page =  () => {

    const params : {workspaceId : string, folderId : string, fileId : string} = useParams();
    const actions = useBearActions();
    const fileName = usePage()
    const {isConnected} = useSocket();
    const supabase = createClient();
    const socket = useWebSocket();
    //let username : string;
    const [email, setEmail] = useState<string>()

    useEffect(() => {
        async function main() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email) {
                setEmail(user.email);
            }
        }
        main();
    }, [supabase]);

    useEffect(() => {
        if (isConnected && socket && email) {
            socket.send(JSON.stringify({
                type : "join_room",
                email,
                workspaceId : params.workspaceId
            }))
        }
    },[socket,isConnected, email])

    useEffect(() => {
        async function setTitle () {
            Promise.all([getWorkspaceTitle(params.workspaceId), getFolderTitle(params.folderId), getFileTitle(params.fileId)]).then(([workspaceTitle, folderTitle, fileTitle]) => {
                actions.setWorkspaceName(workspaceTitle)
                actions.setFolderName(folderTitle)
                actions.setPageName(fileTitle)
            });
            const members = await getCollaborators(params.workspaceId);
            const membersWithStatus = members!.map(member => ({
                ...member,
                status: false,
            }));
            actions.setMembers(membersWithStatus);
        }
        setTitle()
    }, []);

    return <div className="w-screen h-screen">
        <div className="w-full h-[40%] bg-blue-200 rounded-lg">

        </div>
        <Input value={fileName} className="border-none h-fit font-bold text-9xl leading-none" />
        <QuillEditor fileId={params.fileId} folderId={params.folderId} workspaceId={params.workspaceId} />
        {/*<FlowEditor fileId={params.fileId} folderId={params.folderId} workspaceId={params.workspaceId} />*/}
    </div>
}

export default Page