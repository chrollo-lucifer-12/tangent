import {z} from "zod";
import {formSchema} from "@/utils/constants";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function signup(formData : z.infer<typeof formSchema>) {
    const supabase = await createClient();

    const data = {
        email : formData.email as string,
        password: formData.password as string
    }

    console.log(data);

    const {error} = await supabase.auth.signUp(data);

    if (error) {
        console.log(error);
        redirect('/error');
    }
    revalidatePath("/", "layout")
    redirect("/");
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
