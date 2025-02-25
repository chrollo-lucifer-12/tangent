
import {Folder, workspace, File} from "@/lib/supabase/supabase.types";
import {create} from "zustand/react";

type userState = {
    email : string,
    socket : WebSocket | null,
    fullname : string,
    avatarUrl : any,
    members : {fullname : string | null, imageUrl : string | null, id : string}[] | undefined,
    currentWorkspace : string,
    currentFolder : string,
    currentPage : string
    pages: File[],
    workspaceFolders : Folder[],
    privateWorkspaces : workspace[],
    sharedWorkspaces : workspace[],
    collaboratingWorkspaces : workspace[],
    actions: {
        setSocket : (newSocket : WebSocket | null) => void,
        changeEmail : (newEmail : string) => void,
        changeFullName : (newFullName : string) => void
        changeAvatarUrl : (newFile : any) => void
        setWorkspaceName : (title : string) => void
        setFolderName : (title : string) => void
        setPageName : (title : string) => void
        setMembers : ( members : {fullname : string | null, imageUrl : string | null, id : string}[] | undefined) => void
        changePrivateWorkspaces : (newWorkspaces : workspace[]) => void
        changeSharedWorkspaces : (newWorkspaces : workspace[]) => void
        changeCollaboratingWorkspaces : (newWorkspaces : workspace[]) => void
        changeworkspaceFolders : (newFolders : Folder[]) => void
        changePages : (newPages : File[]) => void
        renameWorkspaceFolder : (newName : string, folderId : string) => void
    },
}

const useBearStore = create<userState>((set) => ({
    email : "",
    fullname : "user",
    avatarUrl : "",
    currentWorkspace : "",
    currentFolder : "",
    currentPage : "",
    pages: [],
    workspaceFolders : [],
    privateWorkspaces : [],
    sharedWorkspaces : [],
    collaboratingWorkspaces : [],
    members : [],
    socket : null,
    actions: {
        setSocket : (newSocket : WebSocket | null) => set({socket : newSocket}),
        setMembers : ( newmembers : {fullname : string | null, imageUrl : string | null, id : string}[] | undefined) => set({members : newmembers}),
        setFolderName : (title : string) => set({currentFolder : title}),
        setWorkspaceName : (title : string) => set({currentWorkspace : title}),
        setPageName : (title : string) => set({currentPage : title}),
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
export const useWorkspace = () => useBearStore((state) => state.currentWorkspace)
export const useFolder = () => useBearStore((state) => state.currentFolder)
export const usePage = () => useBearStore((state) => state.currentPage)
export const useFullName = () => useBearStore((state) => state.fullname)
export const useAvatar = () => useBearStore((state) => state.avatarUrl)
export const usePrivateWorkspaces = () => useBearStore((state) => state.privateWorkspaces)
export const useSharedWorkspaces = () => useBearStore((state) => state.sharedWorkspaces)
export const useCollaboratingWorkspaces = () => useBearStore((state) => state.collaboratingWorkspaces);
export const useWorkspaceFolders = () => useBearStore((state) => state.workspaceFolders)
export const usePages = () => useBearStore((state) => state.pages)
export const useMembers = () => useBearStore((state) => state.members)
export const useWebSocket = () => useBearStore((state) => state.socket)

export const useBearActions = () =>
    useBearStore((state) => state.actions)