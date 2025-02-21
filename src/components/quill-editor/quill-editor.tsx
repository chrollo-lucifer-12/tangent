"use client"

import React, {useCallback, useEffect, useState} from "react";
import "quill/dist/quill.snow.css"
import {useWebSocket} from "@/lib/providers/state-provider";
import {getEditorContent, updateEditorContent} from "@/utils/supabase/queries";

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
    const socket = useWebSocket();

    useEffect(() => {
        if (quill) {
        async function fetchEditorData () {
            const contents = await getEditorContent(fileId);
            quill.setContents({ops : contents})
        }
        fetchEditorData();}
    },[quill])

    useEffect(() => {
        if (!quill) return;

        const handleTextChange = async (delta: any, oldDelta: any, source: string) => {
            if (source === "user") {
                socket?.send(JSON.stringify({
                     type: "update_editor",
                     data: quill.getContents().ops,
                     workspaceId,
                     folderId,
                     fileId
                }));
                await updateEditorContent(folderId, fileId, workspaceId, JSON.stringify(quill.getContents().ops))
            }
        };

        function messageHandler(event : any) {
            const message = JSON.parse(event.data);
            if (message.type === "update_editor") {
                if (workspaceId === message.workspaceId && folderId === message.folderId && fileId === message.fileId) {
                    const selection = quill.getSelection();
                    quill.setContents({ops: message.data})
                    if (selection) {
                        quill.setSelection(selection);
                    }
                }
            }
        }

        socket?.addEventListener("message", messageHandler);

        quill.on('text-change', handleTextChange);

        return () => {
            quill.off('text-change', handleTextChange);
            socket?.removeEventListener("message", messageHandler);
        };
    }, [quill,socket]);

    const wrappedRef = useCallback(async (wrapper : any) => {
        if (!wrapper) return;
        wrapper.innerHTML = ""
        const editor = document.createElement("div");
        wrapper.append(editor);
        const Quill = (await import("quill")).default
        const q = new Quill(editor, {
            theme: "snow",
            modules: {
                toolbar: TOOLBAR_OPTIONS,
            }
        })
        setQuill(q);
    }, [])

    return <>
        <div className="flex justify-center items-center relative mt-2 items-center ">
            <div id="container" className="w-full h-screen border-0 border-none focus:border-none" ref={wrappedRef} style={{border : "none"}}>
            </div>
        </div>
    </>
}

export default QuillEditor