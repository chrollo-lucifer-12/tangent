"use client"
import { loginGithub, signup, updateInfo} from './actions'
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

import { Input } from "@/components/ui/input"
import { z } from "zod"
import { signupSchema, uploadDetailsSchema} from "@/utils/constants";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import githublogo from "../../../../public/github-mark-white.png"
import Image from "next/image";
import {useState} from "react";
import Step from "@/components/auth-page/step";
import AlertEmail from "@/components/auth-page/alert-email";
import UserCard from "@/components/user/user-card";
import {useBearActions} from "@/lib/providers/state-provider";

export default function SignupPage({emailVerified} : {emailVerified : boolean}) {
    const [submitError, setSubmitError] = useState<string>('')
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [fullName, setFullName] = useState<string>('')
    const [steps, setSteps] = useState<number>(emailVerified ? 2 : 1);
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(emailVerified);


    const {register : signupSchemaRegister,  watch : signupSchemaWatch, handleSubmit : signupSchemaHandleSubmit, formState: {errors : signupSchemaErrors}} = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {},
    })

    useBearActions().changeEmail(signupSchemaWatch("email"))

    const {register : uploadDetailsSchemaRegister, watch : uploadDetailsSchemaWatch, handleSubmit : uploadDetailsSchemaHandleSubmit, formState: {errors : uploadDetailsSchemaErrors}} = useForm<z.infer<typeof uploadDetailsSchema>>({
        resolver: zodResolver(uploadDetailsSchema),
        defaultValues: {},
    })

    useBearActions().changeFullName(uploadDetailsSchemaWatch("full_name"))
    useBearActions().changeAvatarUrl(uploadDetailsSchemaWatch("file"));

    async function onSubmit(values: z.infer<typeof signupSchema>) {
        //console.log(values);
        const res = await signup(values);
        if (res) {
            setSubmitError(res);
        }
    }

    async function handleSecondSubmit(values : z.infer<typeof uploadDetailsSchema>) {
        const file = values.file?.[0];
        //console.log("second");
        const res  = await updateInfo(file, values.full_name);
        setSubmitError(res!);
    }

    return (
        <div className="w-full flex">
            <div className="w-[30%] h-screen flex flex-col items-center gap-20">
                <p className="text-[#484a4b] mt-20 text-center">Get started with these two simple steps</p>
                <Step step={steps}/>
                {
                    isEmailVerified ? (<UserCard />) : (<AlertEmail/>)
                }
            </div>
            <div className="flex min-h-svh w-[70%] h-screen items-center justify-center p-6 md:p-10 bg-[#181c1f]">
                {
                    steps === 1 ? (
                        <Card className="border-none bg-transparent">
                            <CardHeader>
                                <CardTitle className="text-2xl">Signup</CardTitle>
                                <CardDescription>
                                    Enter your details below to create your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={signupSchemaHandleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                className="bg-[#282b30]"
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                required
                                                {...signupSchemaRegister("email")}
                                            />
                                            {signupSchemaErrors.email && (
                                                <p className="text-white text-sm">{signupSchemaErrors.email.message}</p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Password</Label>

                                            </div>
                                            <Input className="bg-[#282b30]" id="password" type="password"
                                                   required {...signupSchemaRegister("password")} />
                                            {signupSchemaErrors.password && (
                                                <p className="text-white text-sm">{signupSchemaErrors.password.message}</p>
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
                    ) : (
                        <Card className="border-none bg-transparent">
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    Upload Details
                                </CardTitle>
                                <CardDescription>
                                    Enter your details below to create your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-6">
                                <form onSubmit={uploadDetailsSchemaHandleSubmit(handleSecondSubmit)}>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="fullname">Full Name</Label>
                                            <Input
                                                className="bg-[#282b30]"
                                                id="fullname"
                                                type="text"
                                                placeholder="m@example.com"
                                                {...uploadDetailsSchemaRegister("full_name")}
                                            />
                                            {uploadDetailsSchemaErrors.full_name && (
                                                <p className="text-white text-sm">{uploadDetailsSchemaErrors.full_name.message}</p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="picture">Profile Picture</Label>
                                            </div>
                                            <Input className="bg-[#282b30]" id="picture" type="file" {...uploadDetailsSchemaRegister("file")} />

                                        </div>
                                        <Button type="submit"
                                                className="w-full relative dark:bg-[#18181a] text-[#dcdcdd] hover:ring-2 transition duration-150">
                                            Submit
                                        </Button>
                                        {
                                            submitError && (

                                                <p className="text-center text-red-500">{submitError}</p>
                                            )
                                        }
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )
                }
            </div>
        </div>
    )
}