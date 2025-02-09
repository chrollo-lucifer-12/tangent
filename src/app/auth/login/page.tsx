"use client"
import {login, loginGithub} from './actions'
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
import {formSchema} from "@/utils/constants";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import githublogo from "../../../../public/github-mark-white.png"
import Image from "next/image";

export default function LoginPage() {

    const {register, formState: {errors}} = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        await login(values);
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <Card className="border-[#232325]">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
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

                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input id="password" type="password" required {...register("password")} />
                        </div>

                        <Button type="submit" className="w-full relative dark:bg-[#18181a] text-[#dcdcdd] hover:ring-2 transition duration-150">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full flex flex-row items-center dark:bg-[#18181a] text-[#dcdcdd] hover:scale-[101%] transition duration-150">
                            <span>Login with Github</span>
                            <Image src={githublogo} alt="github logo" className="w-6 h-6" />
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
    )
}