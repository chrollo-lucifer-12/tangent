// "use client";
//
// import React, { useCallback, useEffect, useState } from "react";
// import {
//     ReactFlow,
//     addEdge,
//     applyEdgeChanges,
//     applyNodeChanges,
//     Background,
//     Node,
//     Edge,
//     Connection,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import TextUpdaterNode from "./text-update-node";
// import { useWebSocket } from "@/lib/providers/state-provider";
// import { Button } from "@/components/ui/button";
//
// const rfStyle = {
//     backgroundColor: "#000",
// };
//
// interface FlowEditorProps {
//     workspaceId: string;
//     folderId: string;
//     fileId: string;
// }
//
// const nodeTypes = { textUpdater: TextUpdaterNode };
//
// const FlowEditor: React.FC<FlowEditorProps> = ({ workspaceId, folderId, fileId }) => {
//     const [nodes, setNodes] = useState<Node[]>([]);
//     const [edges, setEdges] = useState<Edge[]>([]);
//     const socket = useWebSocket();
//
//     useEffect(() => {
//         if (!socket) return;
//
//         const handleMessage = (event: MessageEvent) => {
//             const message = JSON.parse(event.data);
//             if (message.folderId === folderId && message.fileId === fileId) {
//                 if (message.type === "update_nodes") {
//                     setNodes(message.nodes);
//                 } else if (message.type === "update_edges") {
//                     setEdges(message.edges);
//                 }
//             }
//         };
//
//         socket.addEventListener("message", handleMessage);
//
//         return () => {
//             socket.removeEventListener("message", handleMessage);
//         };
//     }, [socket, folderId, fileId]);
//
//     const sendUpdate = useCallback((type: string, data: any) => {
//         if (socket?.readyState === WebSocket.OPEN) {
//             socket.send(JSON.stringify({
//                 type,
//                 workspaceId,
//                 folderId,
//                 fileId,
//                 ...data,
//             }));
//         }
//     }, [socket, workspaceId, folderId, fileId]);
//
//     const onNodesChange = useCallback(
//         (changes) => {
//             setNodes((nds) => {
//                 const updatedNodes = applyNodeChanges(changes, nds);
//                 sendUpdate("update_nodes", { nodes: updatedNodes });
//                 return updatedNodes;
//             });
//         },
//         [sendUpdate]
//     );
//
//     const onEdgesChange = useCallback(
//         (changes) => {
//             console.log("Edge changes:", changes); // Log changes
//             setEdges((eds) => {
//                 const updatedEdges = applyEdgeChanges(changes, eds);
//                 sendUpdate("update_edges", { edges: updatedEdges });
//                 return updatedEdges;
//             });
//         },
//         [sendUpdate]
//     );
//
//     const onConnect = useCallback(
//         (connection: Connection) => {
//             console.log("Connecting edge:", connection); // Log connection
//
//             setEdges((eds) => {
//                 // Check if edges are undefined or not an array
//                 if (!eds || !Array.isArray(eds)) {
//                     console.error("Current edges are undefined or not an array");
//                     return []; // Return an empty array to avoid further errors
//                 }
//
//                 try {
//                     const updatedEdges = addEdge(connection, eds);
//
//                     // Log the updated edges before sending
//                     console.log("Updated edges:", updatedEdges);
//                     console.log("WebSocket readyState:", socket?.readyState); // Check WebSocket state
//
//                     sendUpdate("update_edges", { edges: updatedEdges }); // Send the updated edges
//                     return updatedEdges;
//                 } catch (error) {
//                     console.error("Error adding edge:", error); // Log error
//                     return eds; // Return existing edges on error
//                 }
//             });
//         },
//         [sendUpdate]
//     );
//
//
//
//     const addNode = useCallback(() => {
//         const newNode: Node = {
//             id: `node-${nodes.length + 1}`,
//             type: "textUpdater",
//             position: { x: Math.random() * 400, y: Math.random() * 400 },
//             data: { value: "New Node" },
//         };
//
//         setNodes((nds) => {
//             const updatedNodes = [...nds, newNode];
//             sendUpdate("update_nodes", { nodes: updatedNodes });
//             return updatedNodes;
//         });
//     }, [nodes, sendUpdate]);
//
//     return (
//         <div className="h-screen flex flex-col">
//             <div className="p-2 bg-zinc-800 flex gap-2">
//                 <Button onClick={addNode}>Add Node</Button>
//             </div>
//             <div className="flex-1">
//                 <ReactFlow
//                     nodes={nodes}
//                     edges={edges}
//                     onNodesChange={onNodesChange}
//                     onEdgesChange={onEdgesChange}
//                     onConnect={onConnect}
//                     nodeTypes={nodeTypes}
//                     fitView
//                     style={rfStyle}
//                     colorMode="dark"
//                 >
//                     <Background color="#4e4e4e" variant="dots" />
//                 </ReactFlow>
//             </div>
//         </div>
//     );
// };
//
// export default FlowEditor;
