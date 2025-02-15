import QuillEditor from "@/components/quill-editor/quill-editor";

const Page = async ({params} : {params : {folderId : string, workspaceId : string, fileId : string}}) => {
    const {folderId, workspaceId, fileId} = await params
    return <div>
        <QuillEditor/>
    </div>
}

export default Page