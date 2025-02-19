"use client"

import React, {useCallback, useEffect, useMemo, useState} from "react";
import "quill/dist/quill.snow.css"
import useSocket from "@/hooks/use-socket";

interface QuillEditorProps {
    fileId : string
    folderId : string
    workspaceId : string
    socket : WebSocket
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

const QuillEditor : React.FC<QuillEditorProps> = ({fileId, folderId,workspaceId,socket}) => {

    const [quill, setQuill] = useState<any>(null);

    useEffect(() => {
        if (!quill) return;

        const handleTextChange = (delta: any, oldDelta: any, source: string) => {
            if (source === "user") {
                socket?.send(JSON.stringify({
                    type: "send_message",
                    data: quill.getContents().ops,
                    workspaceId,
                    folderId,
                    fileId
                }));
            }
        };

        function messageHandler(event) {
            const message = JSON.parse(event.data);
            if (message.type === "receive_message") {
                quill.setContents({ops : message.data})
                console.log(message);
            }
        }

        socket.addEventListener("message", messageHandler);

        quill.on('text-change', handleTextChange);

        return () => {
            quill.off('text-change', handleTextChange);
            socket.removeEventListener("message", messageHandler);
        };
    }, [quill,socket]);

    const wrappedRef = useCallback(async (wrapper) => {
        if (!wrapper) return;
        wrapper.innerHTML = ""
        const editor = document.createElement("div");
        wrapper.append(editor);
        const Quill = (await import("quill")).default
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