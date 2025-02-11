import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/dashboard/app-sidebar";

const WorkspacePage = async ({params} : {params : {workspaceId : string}}) => {

    const {workspaceId} = await params

    return (
        <SidebarProvider>
            <AppSidebar workspaceId={workspaceId} />
            <SidebarTrigger/>
        </SidebarProvider>
    )
}

export default WorkspacePage