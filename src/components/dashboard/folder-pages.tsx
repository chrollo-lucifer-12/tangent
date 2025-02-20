import {getPages} from "@/utils/supabase/queries";
import FolderPagesClient from "@/components/dashboard/folder-pages-client";


const FolderPages = async  ({folderId, workspaceId} : {folderId : string,workspaceId : string}) => {

    const pages = await getPages(folderId);

    return <FolderPagesClient pages={pages} workspaceId={workspaceId} folderId={folderId}/>
}

export default FolderPages