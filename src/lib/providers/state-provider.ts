import { create } from 'zustand'
import {Folder, workspace, File} from "@/lib/supabase/supabase.types";

type userState = {
    email : string,
    fullname : string,
    avatarUrl : any,
    pages: File[],
    workspaceFolders : Folder[],
    privateWorkspaces : workspace[],
    sharedWorkspaces : workspace[],
    collaboratingWorkspaces : workspace[],
    actions: {
        changeEmail : (newEmail : string) => void,
        changeFullName : (newFullName : string) => void
        changeAvatarUrl : (newFile : any) => void
        changePrivateWorkspaces : (newWorkspaces : workspace[]) => void
        changeSharedWorkspaces : (newWorkspaces : workspace[]) => void
        changeCollaboratingWorkspaces : (newWorkspaces : workspace[]) => void
        changeworkspaceFolders : (newFolders : Folder[]) => void
        changePages : (newPages : File[]) => void
        renameWorkspaceFolder : (newName : string, folderId : string) => void
    },
}

const useBearStore = create<userState>((set) => ({
    email : "user@gamil.com",
    fullname : "user",
    avatarUrl : "",
    pages: [],
    workspaceFolders : [],
    privateWorkspaces : [],
    sharedWorkspaces : [],
    collaboratingWorkspaces : [],
    actions: {
        changeEmail: (newEmail: string) => set({email: newEmail}),
        changeFullName: (newFullName: string) => set({fullname: newFullName}),
        changeAvatarUrl: (newFile: any) => set({avatarUrl: newFile}),
        changePrivateWorkspaces: (newWorkspaces: workspace[]) => set({privateWorkspaces : newWorkspaces}),
        changeSharedWorkspaces: (newWorkspaces: workspace[]) => set({sharedWorkspaces : newWorkspaces}),
        changeCollaboratingWorkspaces: (newWorkspaces: workspace[]) => set({collaboratingWorkspaces : newWorkspaces}),
        changeworkspaceFolders: (newFolders: Folder[]) => set({workspaceFolders : newFolders}),
        changePages : (newPages : File[]) => set({pages : newPages}),
        renameWorkspaceFolder : (newName : string, folderId : string) => set((state) => ({
            workspaceFolders : state.workspaceFolders.map((folder) => folder.id === folderId ? {...folder, title : newName} : folder)
        }))
    },
}))

export const useEmail = () => useBearStore((state) => state.email)
export const useFullName = () => useBearStore((state) => state.fullname)
export const useAvatar = () => useBearStore((state) => state.avatarUrl)
export const usePrivateWorkspaces = () => useBearStore((state) => state.privateWorkspaces)
export const useSharedWorkspaces = () => useBearStore((state) => state.sharedWorkspaces)
export const useCollaboratingWorkspaces = () => useBearStore((state) => state.collaboratingWorkspaces);
export const useWorkspaceFolders = () => useBearStore((state) => state.workspaceFolders)
export const usePages = () => useBearStore((state) => state.pages)

export const useBearActions = () =>
    useBearStore((state) => state.actions)