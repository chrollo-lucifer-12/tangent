"use client"
import {loginGithub, signup} from './actions'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import {formSchema} from "@/utils/constants";


export default function SignupPage() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await signup(values);
    }

    return (
        <>
            <main className="w-full flex">
                <section className="w-[50%] h-screen">

                </section>
                <section className="w-[50%] h-screen flex flex-col justify-center items-center">
                    <span>Create An Account</span>
                    <span>Enter your email below to create your account</span>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[50%]">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-white text-black">Submit</Button>
                        </form>
                    </Form>
                </section>
                <section>
                    <button onClick={loginGithub}>github</button>
                </section>
            </main>
        </>
    )
}