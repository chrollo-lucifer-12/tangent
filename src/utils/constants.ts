import {z} from "zod";

export const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message: "Password must contain atleast 8 characters"})
})

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message: "Password must contain atleast 8 characters"}),
    fullName : z.string().min(3, {message: "Name must contain atleast 8 characters"})
})