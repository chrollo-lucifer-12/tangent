"use server"

import {v4} from "uuid";
import {createClient} from "@/utils/supabase/server";
import db from "@/lib/supabase/db";
import {workspaces} from "../../../migrations/schema";

export async function createWorkspace(workspaceName : string, file : any, userId : string) {
    const workspaceUUID = v4();
    console.log(workspaceUUID);
    const supabase = await createClient();
    let filePath = null;
    if (file) {
        const {data, error} = await supabase.storage.from("logos").upload(`workspace/${workspaceUUID}.png`,file);
        if (error) {
            return {data : null, success : false}
        }
        filePath = data?.path
    }
    try {
        const res = await db.insert(workspaces).values({
            id: workspaceUUID,
            title: workspaceName,
            workspaceOwner: userId,
            logo: filePath,
            createdAt: new Date().toISOString(),
            data: null,
            iconId: "",
            inTrash: "",
            bannerUrl: ""
        });
        return {data : workspaceUUID, success : true}
    } catch (e) {
        console.log(e);
        return {success : false};
    }
}