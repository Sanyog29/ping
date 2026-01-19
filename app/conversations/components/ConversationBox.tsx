'use client'
import Avatar from "@/app/components/Avatar";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import AvatarGroup from "@/app/components/AvatarGroup"

import Image from "next/image";
import { Conversation, User, Message } from "@prisma/client";
import { FullConversationType } from "@/app/types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import useOtherUser from "@/app/hooks/useOtherUser";

interface ConversationBoxProps {
    data: FullConversationType;
    selected: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();
    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];
        return messages[messages.length - 1];
    }, [data.messages]);

    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }
        const seenArray = lastMessage.seenUsers || [];

        if (!userEmail) {
            return false;
        }
        return seenArray.filter((user) => user.email === userEmail).length !== 0;
    }, [lastMessage, userEmail]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return "Sent an image";
        }
        if (lastMessage?.body) {
            return lastMessage?.body;
        }
        return "Started a Conversation";
    }, [lastMessage]);

    return (
        <div onClick={handleClick} className={clsx("flex items-center gap-3 p-3", selected ? "bg-primary" : "")}>
            {data.isGroup ? (
                <AvatarGroup users={data.users} />) : (
                <Avatar user={otherUser} />
            )}
            <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-900">
                        {data.name || otherUser.name}
                    </p>
                    {lastMessage?.createdAt && (
                        <p className="text-xs text-gray-400 font-light">{format(new Date(lastMessage.createdAt), "p")}</p>
                    )}
                </div>
                <p className={clsx("truncate text-sm", hasSeen ? "text-gray-500" : "text-black font-medium")}>
                    {lastMessageText}
                </p>
            </div>
        </div>
    );
};

export default ConversationBox;
