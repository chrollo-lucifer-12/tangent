"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { workspaceSchema } from "@/utils/constants";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {createWorkspace, revalidateDashboard} from "@/utils/supabase/queries";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";


const DashboardSetup = ({ userId }: { userId: string }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {isSubmitting: isLoading, errors},
    } = useForm<z.infer<typeof workspaceSchema>>({
        defaultValues: {},
    });

    async function onSubmit(values: z.infer<typeof workspaceSchema>) {
        const file = values.file?.[0];
        await createWorkspace(values.workspaceName, file, userId);
        reset();
        await revalidateDashboard();
    }

    return (
        <>
            {/*<CollaboratorsSheet openSheet={openSheet} setOpenSheet={setOpenSheet} addedMembers={addedMembers} setAddedMembers={setAddedMembers} />*/}
        <div className="flex justify-center items-center">
            <Card
                className="border-none bg-transparent p-0 m-0">
                <div className="">

                </div>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Create a new workspace</CardTitle>
                        <CardDescription>Teamspaces are where your team organizes pages, permissions and
                            members
                        </CardDescription>
                    </div>
                    <div>
                        <div className="w-20 h-20 rounded-full bg-blue-500 blur">

                        </div>
                    </div>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6">
                    <CardContent className="flex gap-6 items-center flex-col mt-6 w-full">
                        <div className="flex flex-col gap-6 w-full">
                            <div className="flex flex-col gap-4 w-full">
                                <Label htmlFor="name" className="text-[#6f6f6f] text-[12px]">Workspace Name</Label>
                                <Input className="bg-[#2f2f2d] text-[#6c6c6c] focus:ring-0" id="name" type="text" {...register("workspaceName")}
                                       placeholder="Workspace name"/>
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                <Label htmlFor="logo" className="text-[#6f6f6f] text-[12px]">Workspace Logo</Label>
                                <Input className="bg-[#2f2f2d] text-[#6c6c6c]" id="logo" type="file" accept="image/*" {...register("file")} />
                            </div>
                        </div>
                        <Button className="text-[12px] h-fit bg-[#0a84ff] hover:bg-[#0a84ff]" type="submit" disabled={isLoading}>Create Teamspace</Button>
                    </CardContent>
                </form>
                <Separator className="m-2" />
                <div className="flex justify-between items-center h-14 pt-1 pb-1 pl-6 pr-6">
                    <span className="text-[12px]">Learn about teamspaces</span>

                </div>
            </Card>
        </div>
        </>
    );
}

export default DashboardSetup;
