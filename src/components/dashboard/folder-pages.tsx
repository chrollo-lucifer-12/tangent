import {getPages} from "@/utils/supabase/queries";


const FolderPages = async ({folderId} : {folderId : string}) => {

    const files = await getPages(folderId);

    return <div>
        {
            files.map((file,i) => (

            ))
        }
    </div>
}
export default FolderPages