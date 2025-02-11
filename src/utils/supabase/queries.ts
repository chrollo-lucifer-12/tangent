"use server"

import {v4, validate} from "uuid";
import {createClient} from "@/utils/supabase/server";
import db from "@/lib/supabase/db";
import {workspaces, folders, users} from "../../../migrations/schema";
import {and, eq, notExists} from "drizzle-orm";
import {collaborators} from "@/lib/supabase/schema";
import {Folder, Subscription, workspace} from "../../lib/supabase/supabase.types";

export async function getUserData(userId : string) {
    const data = await db.select().from(users).where(eq(users.id,userId));
    return {fullname : data[0].fullName, email : data[0].email, avatarUrl : data[0].avatarUrl}
}

export async function createWorkspace(workspaceName : string, file : any, userId : string) {
    const workspaceUUID = v4();
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

export async function getUserSubscriptionStatus (userId : string) {
    try {
        const data = await db.query.subscriptions.findFirst({
            where: (s,{eq}) => eq(s.userId, userId)
        })

        if (data) return {data : data as Subscription, error : null};
        else return {data : null, error : null}
    } catch (e) {
        console.log(e);
        return {data : null, error : "Something went wrong"};
    }
}

export async function getFolders (workspaceId : string) {
    const isValid = validate(workspaceId);
    if (!isValid)
        return {
            data: null,
            error: 'Error',
        };

    try {
        const results: Folder[] | [] = await db
            .select()
            .from(folders)
            .orderBy(folders.createdAt)
            .where(eq(folders.workspaceId, workspaceId));
        return { data: results, error: null };
    } catch (error) {
        return { data: null, error: 'Error' };
    }
}

export async function getPrivateWorkspaces(userId: string) {
    if (!userId) return [];

    console.log("Fetching private workspaces for:", userId);

    const privateWorkspaces = await db
        .select({
            id: workspaces.id,
            createdAt: workspaces.createdAt,
            workspaceOwner: workspaces.workspaceOwner,
            title: workspaces.title,
            iconId: workspaces.iconId,
            data: workspaces.data,
            inTrash: workspaces.inTrash,
            logo: workspaces.logo,
            bannerUrl: workspaces.bannerUrl,
        })
        .from(workspaces)
        .where(
            and(
                notExists(
                    db
                        .select()
                        .from(collaborators)
                        .where(eq(collaborators.workspaceId, workspaces.id))
                ),
                eq(workspaces.workspaceOwner, userId)
            )
        ) as workspace[];

    console.log("Private workspaces fetched:", privateWorkspaces.length);
    return privateWorkspaces;
}

export async function getCollaborativeWorkspaces (userId : string) {
    if (!userId) return [];
    console.log("Fetching collab workspaces for:", userId);
    const collaboratedWorkspaces = await db
        .select({
            id: workspaces.id,
            createdAt: workspaces.createdAt,
            workspaceOwner: workspaces.workspaceOwner,
            title: workspaces.title,
            iconId: workspaces.iconId,
            data: workspaces.data,
            inTrash: workspaces.inTrash,
            logo: workspaces.logo,
            bannerUrl: workspaces.bannerUrl,
        })
        .from(users)
        .innerJoin(collaborators, eq(users.id, collaborators.userId))
        .innerJoin(workspaces, eq(collaborators.workspaceId, workspaces.id))
        .where(eq(users.id, userId)) as workspace[];
    console.log("collab workspaces fetched:", collaboratedWorkspaces.length);
    return collaboratedWorkspaces;
}

export async function getSharedWorkspaces (userId : string) {
    if (!userId) return [];
    console.log("shared workspaces fetching for:", userId);
    const sharedWorkspaces = await db
        .selectDistinct({
            id: workspaces.id,
            createdAt: workspaces.createdAt,
            workspaceOwner: workspaces.workspaceOwner,
            title: workspaces.title,
            iconId: workspaces.iconId,
            data: workspaces.data,
            inTrash: workspaces.inTrash,
            logo: workspaces.logo,
            bannerUrl: workspaces.bannerUrl,
        })
        .from(workspaces)
        .orderBy(workspaces.createdAt)
        .innerJoin(collaborators, eq(workspaces.id, collaborators.workspaceId))
        .where(eq(workspaces.workspaceOwner, userId)) as workspace[];
    console.log("shared workspaces fetched:",  sharedWorkspaces.length);
    return sharedWorkspaces;
}