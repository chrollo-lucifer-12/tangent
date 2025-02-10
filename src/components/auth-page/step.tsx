import React from "react";
import {User} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Step = ({step} : {step : number}) => {
    return (
        <div className="flex flex-col items-center">
            <Tabs defaultValue="account" className="flex flex-col">
                <TabsList className="flex flex-col bg-transparent">
                    <TabsTrigger disabled={true} value="account" className="pl-6 pr-6 rounded-2xl gap-4"> <User
                        color={`${step === 1 ? "blue" : "white"}`}/> Signup</TabsTrigger>
                    <TabsContent value="account">Create Your Account</TabsContent>
                </TabsList>
            </Tabs>
            <div className="w-[0.5px] h-[80px] bg-[#2c2d2f] mt-10" />
            <Tabs defaultValue="account" className="flex flex-col mt-10">
                <TabsList className="flex flex-col bg-transparent">
                    <TabsTrigger disabled={true} value="account" className="pl-6 pr-6 rounded-2xl gap-4"> <User
                        color={`${step === 2 ? "blue" : "white"}`}/> Signup</TabsTrigger>
                    <TabsContent value="account">Enter Your Details</TabsContent>
                </TabsList>
            </Tabs>
        </div>
    )
}

export default Step