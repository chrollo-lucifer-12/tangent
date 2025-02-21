// import { useCallback } from 'react';
// import { Handle, Position } from '@xyflow/react';
//
// const handleStyle = { left: 10 };
//
// function TextUpdaterNode({ data, isConnectable }) {
//     const onChange = useCallback((evt) => {
//         console.log(evt.target.value);
//     }, []);
//
//     return (
//         <div className="">
//             <Handle
//                 type="target"
//                 position={Position.Top}
//                 isConnectable={isConnectable}
//             />
//             <div>
//                 <input id="text" name="text" onChange={onChange} className="bg-[#1e1e1e] rounded-md p-3 ring-1 ring-[#3b3b3b] shadow-md shadow-gray-400 focus:cursor-pointer" />
//             </div>
//
//             <Handle
//                 type="source"
//                 position={Position.Bottom}
//                 id="b"
//                 isConnectable={isConnectable}
//             />
//         </div>
//     );
// }
//
// export default TextUpdaterNode;