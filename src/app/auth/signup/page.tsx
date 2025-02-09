"use client"
import {loginGithub, signup} from './actions'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Input } from "@/components/ui/input"
import { z } from "zod"
import { signupSchema} from "@/utils/constants";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import githublogo from "../../../../public/github-mark-white.png"
import Image from "next/image";
import {useState} from "react";

export default function SignupPage() {

    const [submitError, setSubmitError] = useState<string>('')
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {

        },
    })

    console.log(submitError);

    async function onSubmit(values: z.infer<typeof signupSchema>) {
        const res = await signup(values);
        if (res) {
            setSubmitError(res);
        }
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <Card className="border-[#232325]">
                <CardHeader>
                    <CardTitle className="text-2xl">Signup</CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
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
                                    required
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
                                <Input id="password" type="password" required {...register("password")} />
                                {errors.password && (
                                    <p className="text-white text-sm">{errors.password.message}</p>
                                )}
                            </div>

                            <Button type="submit"
                                    className="w-full relative dark:bg-[#18181a] text-[#dcdcdd] hover:ring-2 transition duration-150">
                                Signup
                            </Button>
                            {
                                submitError && (

                                    <p className="text-center text-red-500">{submitError}</p>
                                )
                            }
                            <Button onClick={loginGithub} variant="outline"
                                    className="w-full flex flex-row items-center dark:bg-[#18181a] text-[#dcdcdd] hover:ring-2 transition duration-150">
                                <span>Signup with Github</span>
                                <Image src={githublogo} alt="github logo" className="w-6 h-6"/>
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="underline underline-offset-4">
                                Log In
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}