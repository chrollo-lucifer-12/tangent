"use client"
import {useEffect, useState} from "react";


const useSocket = () => {
    const [socket,setSocket] = useState<WebSocket | null>(null)
    const [isConnected, setIsConnected] = useState<boolean>(false);
    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:8080");

        newSocket.onopen = () => {
            setIsConnected(true);
            console.log("connected");
        }

        newSocket.onclose = () => {
            setIsConnected(false);
            console.log("disconnected");
        }

        setSocket(newSocket);

        return () => {
            newSocket.close()
        }
    },[])
    return {socket,isConnected}
}

export default useSocket