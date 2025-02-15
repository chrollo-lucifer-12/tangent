import {redirect} from "next/navigation";
import {getPages} from "@/utils/supabase/queries";

const Page =  ({params} : {params : {folderId : string, workspaceId : string}}) => {
   redirect(`/dashboard/${params.workspaceId}/${params.folderId}/1`)
}

export default Page