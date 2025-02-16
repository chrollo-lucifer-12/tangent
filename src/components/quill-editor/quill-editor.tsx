"use client"

import React, {useCallback, useMemo, useState} from "react";
import "quill/dist/quill.snow.css"
import useSocket from "@/hooks/use-socket";

interface QuillEditorProps {
    fileId : string
    folderId : string
    workspaceId : string
}

const TOOLBAR_OPTIONS = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['clean'],
];

const QuillEditor : React.FC<QuillEditorProps> = ({fileId, folderId,workspaceId}) => {

    const [quill, setQuill] = useState<any>(null);

    const {socket, isConnected} = useSocket()

    console.log(isConnected);

    const wrappedRef = useCallback(async (wrapper) => {
        if (!wrapper) return;
        wrapper.innerHTML = ""
        const editor = document.createElement("div");
        wrapper.append(editor);
        const Quill = (await import("quill")).default
        // cursors
        const q = new Quill(editor, {
            theme: "snow",
            modules: {
                toolbar: TOOLBAR_OPTIONS
            }
        })
        setQuill(q);
    }, [])

    return <>
        <div className="flex justify-center items-center relative mt-2 items-center ">
            <div id="container" className="w-full h-screen border-0 border-none focus:border-none" ref={wrappedRef}>
            </div>
        </div>
    </>
}

export default QuillEditor