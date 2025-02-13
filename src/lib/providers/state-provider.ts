import { create } from 'zustand'
import {workspace} from "@/lib/supabase/supabase.types";

type userState = {
    email : string,
    fullname : string,
    avatarUrl : any,
    privateWorkspaces : workspace[],
    sharedWorkspaces : workspace[],
    collaboratingWorkspaces : workspace[],
    actions: {
        changeEmail : (newEmail : string) => void,
        changeFullName : (newFullName : string) => void
        changeAvatarUrl : (newFile : any) => void
        changePrivateWorkspaces : (newWorkspace : workspace) => void
        changeSharedWorkspaces : (newWorkspace : workspace) => void
        changeCollaboratingWorkspaces : (newWorkspace : workspace) => void
        resetWorkspaces : () => void
    },
}

const useBearStore = create<userState>((set) => ({
    email : "user@gamil.com",
    fullname : "user",
    avatarUrl : "",
    privateWorkspaces : [],
    sharedWorkspaces : [],
    collaboratingWorkspaces : [],
    actions: {
        changeEmail: (newEmail: string) => set({email: newEmail}),
        changeFullName: (newFullName: string) => set({fullname: newFullName}),
        changeAvatarUrl: (newFile: any) => set({avatarUrl: newFile}),
        changePrivateWorkspaces: (newWorkspace: workspace) => set((state) => ({
            privateWorkspaces : [...state.privateWorkspaces, newWorkspace]
        })),
        changeSharedWorkspaces: (newWorkspace: workspace) => set((state) => ({
            sharedWorkspaces : [...state.sharedWorkspaces, newWorkspace]
        })),
        changeCollaboratingWorkspaces: (newWorkspace: workspace) => set((state) => ({
            collaboratingWorkspaces : [...state.collaboratingWorkspaces, newWorkspace]
        })),
        resetWorkspaces : () => set({privateWorkspaces : [], sharedWorkspaces : [], collaboratingWorkspaces : []})
    },
}))

export const useEmail = () => useBearStore((state) => state.email)
export const useFullName = () => useBearStore((state) => state.fullname)
export const useAvatar = () => useBearStore((state) => state.avatarUrl)
export const usePrivateWorkspaces = () => useBearStore((state) => state.privateWorkspaces)
export const useSharedWorkspaces = () => useBearStore((state) => state.sharedWorkspaces)
export const useCollaboratingWorkspaces = () => useBearStore((state) => state.collaboratingWorkspaces);

export const useBearActions = () =>
    useBearStore((state) => state.actions)