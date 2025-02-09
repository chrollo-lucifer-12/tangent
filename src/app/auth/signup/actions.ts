"use server"
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {z} from "zod";
import {signupSchema} from "@/utils/constants";

export async function signup(formData : z.infer<typeof signupSchema>) {
    const supabase = await createClient();

    const {  error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
    })

    if (error) {
        return error.message;
    }
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
