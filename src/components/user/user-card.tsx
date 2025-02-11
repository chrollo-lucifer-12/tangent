import React, { useMemo } from "react";
import { Alert } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFullName, useEmail, useAvatar } from "@/lib/providers/state-provider";

const UserCard = () => {
    const fullname = useFullName();
    const email = useEmail();
    const avatarUrl = useAvatar(); // FileList

    const avatarSrc = useMemo(() => {
        if (avatarUrl?.[0]) {
            return URL.createObjectURL(avatarUrl[0]);
        }
        return "";
    }, [avatarUrl]);

    return (
        <Alert className="border-none w-[80%] flex items-center gap-10">
            <Avatar>
                <AvatarImage src={avatarSrc} alt="User Avatar" />
                <AvatarFallback>{fullname?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="font-semibold">{fullname}</span>
                <span className="font-extralight">{email}</span>
            </div>
        </Alert>
    );
};

export default UserCard;
