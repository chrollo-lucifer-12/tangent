"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { workspaceSchema } from "@/utils/constants";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {createWorkspace} from "@/utils/supabase/queries";
import {redirect} from "next/navigation"
import {Label} from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ChevronDown, Lock, Share2} from "lucide-react";
import {DropdownMenuCheckboxItemProps} from "@radix-ui/react-dropdown-menu";
import CollaboratorsSheet from "@/components/dashboard/collaborators-sheet";


const DashboardSetup = ({ userId }: { userId: string }) => {


    const [permission, setPermission] = useState("Private")
    const [openSheet, setOpenSheet] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: {isSubmitting: isLoading, errors},
    } = useForm<z.infer<typeof workspaceSchema>>({
        mode: "onChange",
        defaultValues: {},
    });

    async function onSubmit(values: z.infer<typeof workspaceSchema>) {
        const file = values.file?.[0];
        const res = await createWorkspace(values.workspaceName, file, userId);
        if (res.success) {
            redirect(`/dashboard/${res.data}`);
        } else {

        }
    }

    return (
        <>
            <CollaboratorsSheet openSheet={openSheet}/>
        <div className="flex justify-center items-center">
            <Card
                className="border-none relative">
                <CardHeader>
                    <CardTitle>Create a new workspace</CardTitle>
                    <CardDescription>Teamspaces are where your team organizes pages, permissions and
                        members</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6">
                    <CardContent className="flex gap-6 items-center flex-col">
                        <div className="flex flex-row gap-6">
                            <div className="flex flex-col gap-1 w-full">
                                <Label htmlFor="name">Workspace Name</Label>
                                <Input id="name" type="text" {...register("workspaceName")}
                                       placeholder="Workspace name"/>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <Label htmlFor="logo">Workspace Logo</Label>
                                <Input id="logo" type="file" accept="image/*" {...register("file")} />
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="w-full">
                                <Button variant="ghost" className="flex justify-between">
                                    <div className="flex flex-row gap-6 items-center">
                                        {
                                            permission === "Private" ? (<Lock/>) : (<Share2/>)
                                        }
                                        <span>{permission}</span>
                                    </div>
                                    <span><ChevronDown/></span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[400px]">
                                <DropdownMenuItem onClick={() => setPermission("Private")}>
                                    Private
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setPermission("Shared")}>
                                    Shared
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {
                            permission === "Shared" && (<Button onClick={() => setOpenSheet(prev => !prev)} className="border border-[#453128] bg-[#302523] text-[#e4714a] hover:bg-[#302523]"> + Add Member</Button>)
                        }
                    </CardContent>

                </form>
            </Card>
        </div>
        </>
    );
}

export default DashboardSetup;
