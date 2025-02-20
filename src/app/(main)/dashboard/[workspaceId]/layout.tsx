import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import React from "react";
import SidebarHeaderBreadCrumb from "@/components/dashboard/sidebar-header";



const Layout = async ({ params, children }: { children: React.ReactNode, params: { workspaceId: string } }) => {
    const {workspaceId} = await params;

    return (
        <main className="flex min-h-screen">
            <SidebarProvider>
                <AppSidebar workspaceId={workspaceId}/>
                <SidebarInset>
                    <SidebarHeaderBreadCrumb/>
                    <section>
                        {children}
                    </section>
                </SidebarInset>
            </SidebarProvider>
        </main>
    );
}

export default Layout;
