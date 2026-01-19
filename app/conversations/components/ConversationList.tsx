'use client'
import { FullConversationType } from "@/app/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupchatModal from "./GroupchatModal";
import clsx from "clsx";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import Pusher from "pusher";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems, users }) => {
    const session = useSession();
    const [items, setItems] = useState(initialItems);
    const [isModelOpen, setIsModelOpen] = useState(false);

    const router = useRouter();
    const { conversationId, isOpen } = useConversation();

    const pusherKey = useMemo(() => { return session?.data?.user?.email }, [session?.data?.user?.email]);

    useEffect(() => {
        if (!pusherKey) return;

        pusherClient.subscribe(pusherKey);
        const handler = (conversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) return current;
                return [conversation, ...current];
            });
        }
        const UpdateHandler = (conversation: FullConversationType) => {
            setItems((current) => current.map((currentConversation) => {
                if (currentConversation.id === conversation.id) {
                    return { ...currentConversation, messages: conversation.messages };
                }
                return currentConversation;
            })
            );
        }
        const removeHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                return [...current.filter((currentConversation) => currentConversation.id !== conversation.id)];
            });
            if (conversation.id === conversationId) {
                router.push('/conversations');
            }
        }
        pusherClient.bind('conversation:new', handler);
        pusherClient.bind('conversation:update', UpdateHandler);
        pusherClient.bind('conversation:remove', removeHandler);
        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind('conversation:new', handler);
            pusherClient.unbind('conversation:update', UpdateHandler);
            pusherClient.unbind('conversation:remove', removeHandler);
        }
    }, [pusherKey, router, conversationId]);

    return (
        <>
            <GroupchatModal isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} users={users} />
            <aside className={clsx("fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200", isOpen ? "hidden" : "block w-full left-0")}>

                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-neutral-800">
                            Messages
                        </div>
                        <div onClick={() => setIsModelOpen(true)} className="rounded-full bg-gray-100 text-gray-600 p-2 cursor-pointer hover:opacity-75 transition">
                            <MdOutlineGroupAdd size={20} />
                        </div>
                    </div>
                    {items.map((item) => (
                        <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
                    ))}
                </div>
            </aside>
        </>
    )
};

export default ConversationList;
