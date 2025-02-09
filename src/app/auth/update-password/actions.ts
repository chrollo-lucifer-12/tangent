import {createClient} from "@/utils/supabase/server";

export async function changePassword(new_password : string) {
    const supabase = await createClient();
    await supabase.auth.updateUser({ password: new_password });
}

