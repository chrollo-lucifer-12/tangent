import {z} from "zod";

export const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message: "Password must contain atleast 8 characters"})
})

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message: "Password must contain atleast 8 characters"})
})

export const workspaceSchema = z.object({
    workspaceName: z.string().min(1, {message: "Name cannot be empty"}),
    file: z.any()
})