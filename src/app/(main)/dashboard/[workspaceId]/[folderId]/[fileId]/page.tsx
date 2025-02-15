import QuillEditor from "@/components/quill-editor/quill-editor";

const Page = ({params} : {params : {folderId : string, workspaceId : string, fileId : string}}) => {
    const {folderId, workspaceId, fileId} = params
    return <div>
        <QuillEditor fileId={fileId} folderId={folderId} workspaceId={workspaceId} />
    </div>
}

export default Page