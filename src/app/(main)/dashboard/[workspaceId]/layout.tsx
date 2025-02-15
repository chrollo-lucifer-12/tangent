import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/dashboard/app-sidebar";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import React from "react";

const Layout = ({params,children} : {children : React.ReactNode, params : {workspaceId : string}}) => {
    const {workspaceId} = params
    return <main className="flex">
        <SidebarProvider>
            <AppSidebar workspaceId = {workspaceId} />
                <DashboardNavbar workspaceId={workspaceId}/>

        </SidebarProvider>
        <div>
            {children}
        </div>
    </main>
}

export default Layout