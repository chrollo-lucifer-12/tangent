import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/dashboard/app-sidebar";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";

const WorkspacePage = async ({params} : {params : {workspaceId : string}}) => {

    const {workspaceId} = await params

    return (
        <>
            <SidebarProvider>
                <AppSidebar workspaceId = {workspaceId} />
                <DashboardNavbar workspaceId={workspaceId}/>
            </SidebarProvider>
        </>
    )
}

export default WorkspacePage