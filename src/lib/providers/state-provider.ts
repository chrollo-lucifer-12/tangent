import { create } from 'zustand'

type userState = {
    email : string,
    fullname : string,
    avatarUrl : any,
    actions: {
        changeEmail : (newEmail : string) => void,
        changeFullName : (newFullName : string) => void
        changeAvatarUrl : (newFile : any) => void
    },
}

const useBearStore = create<userState>((set) => ({
    email : "user@gamil.com",
    fullname : "user",
    avatarUrl : "",
    actions: {
        changeEmail : (newEmail : string) => set({email : newEmail}),
        changeFullName : (newFullName : string) => set({fullname : newFullName}),
        changeAvatarUrl : (newFile : any) => set({avatarUrl : newFile})
    },
}))

export const useEmail = () => useBearStore((state) => state.email)
export const useFullName = () => useBearStore((state) => state.fullname)
export const useAvatar = () => useBearStore((state) => state.avatarUrl)

export const useBearActions = () =>
    useBearStore((state) => state.actions)