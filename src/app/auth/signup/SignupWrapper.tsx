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
import { signupSchema} from "@/utils/constants";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import githublogo from "../../../../public/github-mark-white.png"
import Image from "next/image";
import {useState} from "react";
import Step from "@/components/auth-page/step";
import AlertEmail from "@/components/auth-page/alert-email";

export default function SignupPage({emailVerified} : {emailVerified : boolean}) {
    console.log(emailVerified);
    const [submitError, setSubmitError] = useState<string>('')
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [fullName, setFullName] = useState<string>('')
    const [steps, setSteps] = useState<number>(emailVerified ? 2 : 1);
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(emailVerified);

    const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {},
    })

    async function onSubmit(values: z.infer<typeof signupSchema>) {
        console.log(values);
        const res = await signup(values);
        if (res) {
            setSubmitError(res);
        }
    }

    async function handleSecondSubmit(e) {
        e.preventDefault();
        console.log("second");
        const res  = await updateInfo(avatarUrl, fullName);
        setSubmitError(res!);
    }

    return (
        <div className="w-full flex">
            <div className="w-[30%] h-screen flex flex-col items-center gap-20">
                <p className="text-[#484a4b] mt-20 text-center">Get started with these two simple steps</p>
                <Step step={steps}/>
                <AlertEmail status={isEmailVerified}/>
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                className="bg-[#282b30]"
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
                                            <Input className="bg-[#282b30]" id="password" type="password"
                                                   required {...register("password")} />
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
                    ) : (
                        <Card className="border-none bg-transparent">
                            <CardHeader>
                                <CardTitle className="text-2xl">Personal Information</CardTitle>
                                <CardDescription>
                                    Enter your details below to create your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-6">
                                <form onSubmit={handleSecondSubmit}>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="fullname">Full Name</Label>
                                            <Input
                                                className="bg-[#282b30]"
                                                id="fullname"
                                                type="text"
                                                placeholder="m@example.com"
                                                value={fullName}
                                                onChange={(e) => {setFullName(e.target.value)}}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="picture">Profile Picture</Label>
                                            </div>
                                            <Input className="bg-[#282b30]" id="picture" type="file" onChange={(event) => {
                                                setAvatarUrl(URL.createObjectURL(event.target.files[0]));
                                            }} />

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