"use client"
import {getFolderTitle} from "@/utils/supabase/queries";
import {useParams} from "next/navigation";
import {useBearActions} from "@/lib/providers/state-provider";
import {useEffect} from "react";

const Page =  () => {

    const params: { workspaceId: string, folderId : string } = useParams();
    const actions = useBearActions();

    useEffect(() => {
        async function setTitle () {
            const data = await getFolderTitle(params.folderId);
            actions.setFolderName(data);
        }
        setTitle();
    },[]);

    return <div>

    </div>
}

export default Page