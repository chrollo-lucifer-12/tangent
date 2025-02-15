"use client"

import React, {useCallback, useState} from "react";
import "quill/dist/quill.snow.css"

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

    const wrappedRef = useCallback(async (wrapper) => {
        if (!wrapper) return;
        wrapper.innerHTML = ""
        const editor = document.createElement("div");
        wrapper.append(editor);
        const Quill = (await import("quill")).default
        // cursors
        const q = new Quill(editor,{
            theme : "snow",
            modules : {
                toolbar : TOOLBAR_OPTIONS
            }
        })
        setQuill(q);
    }, [])

    return <>
        <div id="container" className="w-full h-screen border-0" ref={wrappedRef}>

        </div>
    </>
}

export default QuillEditor