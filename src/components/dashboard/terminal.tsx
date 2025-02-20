"use client";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { TerminalIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {useFolder, usePage, useWorkspace} from "@/lib/providers/state-provider";


const commands=  [
    "help", "pwd", "cd", "clear"
]

const TerminalComponent = () => {

    const workspaceName = useWorkspace()
    const folderName = useFolder();
    const fileName = usePage()

    const [history, setHistory] = useState<string[]>(["Welcome to your web terminal!"]);
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    function output (commnad : string)  {
        if (!commands.includes(commnad)) return "Invalid command";
        switch (commnad) {
            case "help":
                return "Available commands : pwd, cd"
            case "pwd":
                return `${workspaceName} > ${folderName} > ${fileName}`
            case "cd":
                break
            default:
                break
        }
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [history]);

    const handleCommand = (cmd: string) => {
        if (cmd === "clear") {
            setHistory([]);
            return;
        }
        setHistory((prev) => [...prev, `$ ${cmd}`, `Output: ${output(cmd)}`]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        }
    };

    return (
        <div className="w-full h-64 bg-black text-green-400 font-mono p-2 overflow-y-auto border border-gray-600 rounded-lg">
            {history.map((line, index) => (
                <div key={index}>{line}</div>
            ))}

            <div className="flex">
                <span className="mr-1">{"$"}</span>
                <input
                    ref={inputRef}
                    type="text"
                    className="bg-black text-green-400 font-mono outline-none flex-1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
};

const Terminal = () => {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Activities</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <SidebarMenuButton className="flex items-center justify-between">
                                <span>Terminal</span> <TerminalIcon />
                            </SidebarMenuButton>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Terminal</DrawerTitle>
                            </DrawerHeader>
                            <div className="p-4">
                                <TerminalComponent />
                            </div>
                            <DrawerClose className="absolute top-2 right-2 text-white cursor-pointer">✖</DrawerClose>
                        </DrawerContent>
                    </Drawer>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default Terminal;
