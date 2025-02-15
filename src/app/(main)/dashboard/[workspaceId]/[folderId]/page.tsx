import {redirect} from "next/navigation";
import {getPage} from "@/utils/supabase/queries";

const Page = async ({params} : {params : {folderId : string, workspaceId : string}}) => {
    const pageId = await getPage(params.folderId)

    if (!pageId) {
        return <div>
            Start by creating a page
        </div>
    }

   redirect(`/dashboard/${params.workspaceId}/${params.folderId}/${pageId}`)
}

export default Page