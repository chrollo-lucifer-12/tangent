"use client"

import useSocket from "@/hooks/use-socket";
import {useBearActions} from "@/lib/providers/state-provider";
import {useParams} from "next/navigation";
import {useEffect} from "react";
import {getWorkspaceTitle} from "@/utils/supabase/queries";

const Page = () => {
    const params: { workspaceId: string } = useParams();
    const actions = useBearActions();
    const {socket, isConnected} = useSocket();

    useEffect(() => {
        async function setTitle() {
            const data = await getWorkspaceTitle(params.workspaceId)
            actions.setWorkspaceName(data[0].title);
        }
        setTitle();
    }, []);

    return <div>

    </div>
}

export default Page