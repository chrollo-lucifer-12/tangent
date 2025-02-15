import QuillEditor from "@/components/quill-editor/quill-editor";
import FlowEditor from "@/components/flow-editor/flow-editor";

const Page = ({params} : {params : {folderId : string, workspaceId : string, fileId : string}}) => {
    const {folderId, workspaceId, fileId} = params
    return <div>
        {/*<QuillEditor fileId={fileId} folderId={folderId} workspaceId={workspaceId} />*/}
        <FlowEditor/>
    </div>
}

export default Page