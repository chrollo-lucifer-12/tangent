"use client"
import {useEffect, useState} from "react";
import {useBearActions} from "@/lib/providers/state-provider";


const useSocket = () => {
    const actions = useBearActions();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    useEffect(() => {
        const newSocket = new WebSocket(process.env.NEXT_PUBLIC_SOCKET!);

        newSocket.onopen = () => {
            setIsConnected(true);
            console.log("connected");
        }

        newSocket.onclose = () => {
            setIsConnected(false);
            console.log("disconnected");
        }

        actions.setSocket(newSocket);

        return () => {
            newSocket.close()
            actions.setSocket(null);
        }
    },[])
    return {isConnected}
}

export default useSocket