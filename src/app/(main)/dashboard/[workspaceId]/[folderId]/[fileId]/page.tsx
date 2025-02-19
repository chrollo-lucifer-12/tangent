"use client"
import QuillEditor from "@/components/quill-editor/quill-editor";
import FlowEditor from "@/components/flow-editor/flow-editor";
import useSocket from "@/hooks/use-socket";
import {useEffect} from "react";
import {createClient} from "@/utils/supabase/client";

const Page = ({params} : {params : {folderId : string, workspaceId : string, fileId : string}}) => {
    const {folderId, workspaceId, fileId} = params


    const {socket, isConnected} = useSocket();

    useEffect(() => {
        async function joinRoom () {
            if (socket && isConnected) {
                const supabase = createClient();
                const {data: {user}} = await supabase.auth.getUser()
                console.log(user);
                socket.send(JSON.stringify({
                    type: "join_room",
                    username : user?.id,
                    workspaceId
                }))
            }
        }
        joinRoom()
    }, [workspaceId, socket, isConnected]);


    return <div>
        <QuillEditor fileId={fileId} folderId={folderId} workspaceId={workspaceId} socket = {socket} />
        {/*<FlowEditor/>*/}
    </div>
}

export default Page