"use client";
import { v4 } from 'uuid';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { workspaceSchema } from "@/utils/constants";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {createWorkspace} from "@/utils/supabase/queries";
import {redirect} from "next/navigation";

const DashboardSetup = ({ userId }: { userId: string }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;

        const rotateX = y * -20;
        const rotateY = x * 20;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting: isLoading, errors },
    } = useForm<z.infer<typeof workspaceSchema>>({
        mode: "onChange",
        defaultValues: {},
    });

     async function onSubmit(values: z.infer<typeof workspaceSchema>) {
        const file = values.file?.[0];
        const res = await createWorkspace(values.workspaceName, file, userId);
        if (res.success) {
            redirect(`/dashboard/${res.data}`);
        }
        else {

        }
     }


    return (
        <div className="relative group flex justify-center items-center" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div
                className="absolute inset-0 shadow-md shadow-blue-600 blur opacity-0 group-hover:opacity-75 transition duration-150"
                style={{
                    transform: `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: "transform 0.1s ease-out",
                }}
            ></div>
            <Card
                className="border-none relative"
                style={{
                    transform: `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: "transform 0.1s ease-out",
                }}
            >
                <CardHeader>
                    <CardTitle>Create a new workspace</CardTitle>
                    <CardDescription>Teamspaces are where your team organizes pages, permissions and
                        members</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6">
                    <CardContent className="flex flex-col gap-6">
                        <Input type="text" {...register("workspaceName")} placeholder="Workspace name"/>
                        <Input type="file" accept="image/*" {...register("file")} />
            </CardContent>
            <CardFooter>
                <Button type="submit">Create</Button>
                </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default DashboardSetup;
