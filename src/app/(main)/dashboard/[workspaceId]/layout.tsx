import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import React from "react";

const Layout = ({ params, children }: { children: React.ReactNode, params: { workspaceId: string } }) => {
    const { workspaceId } = params;

    return (
        <main className="flex min-h-screen">
            <SidebarProvider>
                <div className="flex flex-col">
                    <AppSidebar workspaceId={workspaceId} />
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="w-full">
                        <DashboardNavbar workspaceId={workspaceId} />
                    </div>
                    <div className="flex-1 p-4">
                        {children}
                    </div>
                </div>
            </SidebarProvider>
        </main>
    );
};

export default Layout;
