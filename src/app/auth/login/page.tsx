"use client";
import { login, loginGithub } from "./actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { formSchema } from "@/utils/constants";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import githublogo from "../../../../public/github-mark-white.png";
import Image from "next/image";
import {useState} from "react";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const [submitError, setSubmitError] = useState<string>('')

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await login(values);
        if (res) {
            setSubmitError(res);
        }
    }

    return (
        <div className="absolute inset-0 flex justify-center items-center z-10">
            <Card className="border-[#232325] bg-black/80 backdrop-blur-md p-6">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-white text-sm">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" {...register("password")} />
                                {errors.password && (
                                    <p className="text-white text-sm">{errors.password.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full relative dark:bg-[#18181a] text-[#dcdcdd] hover:ring-2 transition duration-150"
                            >
                                Login
                            </Button>
                            {
                                submitError && (

                            <p className="text-center text-red-500">{submitError}</p>
                                )
                            }
                            <Button
                                variant="outline"
                                className="w-full flex flex-row items-center dark:bg-[#18181a] text-[#dcdcdd] hover:ring-2 transition duration-150"
                                type="button"
                                onClick={loginGithub}
                            >
                                <span>Login with Github</span>
                                <Image src={githublogo} alt="github logo" className="w-6 h-6"/>
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/auth/signup" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>

    );
}
