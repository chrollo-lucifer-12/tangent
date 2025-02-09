"use server"
import { createClient } from '@/utils/supabase/server'
import {redirect} from "next/navigation";
import {formSchema} from "@/utils/constants";
import {z} from "zod";


export async function login(formData : z.infer<typeof formSchema>) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
    })

    if (error){
        return error.message
    }

    redirect("/dashboard")
}

export async function loginGithub() {
    const supabase = await createClient();
    const { data } = await supabase.auth.signInWithOAuth({
        provider : "github",
        options: {
            redirectTo: 'http://localhost:3000/auth/callback',
        },
    })
    if (data.url) {
        redirect(data.url)
    }
}

export async function updatePassword(email : string) {
    const supabase = await createClient();
    await supabase.auth.resetPasswordForEmail(email, {redirectTo: "/auth/update-password"})
}