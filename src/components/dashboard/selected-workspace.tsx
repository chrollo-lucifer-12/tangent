"use client"

import {workspace} from "@/lib/supabase/supabase.types";
import React from "react";
import Link from "next/link";

interface SelectedWorkspaceProps {
    workspace : workspace
}

const SelectedWorkspace : React.FC<SelectedWorkspaceProps> = ({workspace}) => {


    // const supabase = createClient();
    //
    // const [workspaceLogo, setWorkspaceLogo] = useState('');
    //
    // useEffect(() => {
    //     if (workspace.logo) {
    //         const {data} = supabase.storage.from("logos").getPublicUrl(`workspaces/${workspace.id}.png`);
    //         console.log(data.publicUrl);
    //         setWorkspaceLogo(data.publicUrl);
    //     }
    // },[workspace]);



    return <Link href="">
        {/*<Image src={workspaceLogo} alt="" width="10" height="10" />*/}
        <div className="font-semibold flex flex-row space-x-4 flex items-center ml-5">
            <span>📌</span>
            <span>{workspace.title}</span>
        </div>
    </Link>
}

export default SelectedWorkspace