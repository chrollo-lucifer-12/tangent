
"use client"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Skeleton } from "@/components/ui/skeleton"
import { useMembers} from "@/lib/providers/state-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";
const MembersNav = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const members = useMembers();

    useEffect(() => {
        if (members!.length > 0) {
            setIsLoading(false);
        }
    }, [members]);

    console.log(members);

    return <div className="ml-10 flex gap-2">
        {
            isLoading ? (<Skeleton className="h-12 w-12 rounded-full" />
            ): (
                members!.map((member, i) => (
                <HoverCard key={i}>
                    <HoverCardTrigger>
                        <Avatar>
                            <AvatarImage />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        {member.fullname}
                    </HoverCardContent>
                </HoverCard>
            ))
            )
        }
    </div>
}

export default MembersNav