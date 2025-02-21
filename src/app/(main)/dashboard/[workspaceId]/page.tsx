"use client"
import {useBearActions} from "@/lib/providers/state-provider";
import {useParams} from "next/navigation";
import {useEffect} from "react";
import {getCollaborators, getWorkspaceTitle} from "@/utils/supabase/queries";

const Page = () => {
    const params: { workspaceId: string } = useParams();
    const actions = useBearActions();

    useEffect(() => {
        async function setTitle() {
            const data = await getWorkspaceTitle(params.workspaceId);
            actions.setWorkspaceName(data)
            const members = await getCollaborators(params.workspaceId);
            actions.setMembers(members);
        }
        setTitle();
    }, []);

    return <div>

    </div>
}

export default Page