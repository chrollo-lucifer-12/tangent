"use client"
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React from "react";
import {useFolder, usePage, useWorkspace} from "@/lib/providers/state-provider";

const SidebarHeaderBreadCrumb = () => {

    const workspaceName = useWorkspace()
    const folderName = useFolder();
    const fileName = usePage()

    return <header
        className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1"/>
            <Separator orientation="vertical" className="mr-2 h-4"/>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink>
                            {workspaceName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {
                        folderName && (

                            <>
                                <BreadcrumbSeparator className="hidden md:block"/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{folderName}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )
                    }
                    {
                        fileName && (
                            <>

                                <BreadcrumbSeparator className="hidden md:block"/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{fileName}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )
                    }
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    </header>
}

export default SidebarHeaderBreadCrumb