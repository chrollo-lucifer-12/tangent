import React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
interface LayoutProps {
    children: React.ReactNode;
    params : any
}
const Layout:React.FC<LayoutProps> = async ({children, params}) => {

    return (
    <SidebarProvider>
        <AppSidebar params={params} />
        <main className="w-screen h-screen flex overflow-hidden">
            <SidebarTrigger/>
            {children}
        </main>
    </SidebarProvider>
    )
}

export default Layout;