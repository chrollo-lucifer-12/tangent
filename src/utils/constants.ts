import {z} from "zod";

export const formSchema = z.object({
    email: z.string().min(10),
    password: z.string().min(8,{message: "Password must contain atleast 8 characters"})
})