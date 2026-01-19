'use client';

import getMessages from "@/app/actions/getMessages";
import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useMemo, useState, useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages);

    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`);
    }, [conversationId]);

    useEffect(() => {
        pusherClient.subscribe(conversationId!);
        bottomRef?.current?.scrollIntoView({ behavior: "smooth" });

        const messageHandler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`);
            setMessages(current => {
                if (find(current, { id: message.id })) return current;
                return [...current, message];
            })
            bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
        }

        const updatedMessageHandler = (newMessage: FullMessageType) => {
            setMessages(current => {
                return current.map((currentMessage) => {
                    if (currentMessage.id === newMessage.id) {
                        return newMessage;
                    }
                    return currentMessage;
                })
            })
        }

        const deleteMessageHandler = (deletedMessage: { id: string }) => {
            setMessages(current => current.filter(message => message.id !== deletedMessage.id));
        }


        pusherClient.bind('message:new', messageHandler);
        pusherClient.bind('message:update', updatedMessageHandler);
        pusherClient.bind('message:delete', deleteMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId!);
            pusherClient.unbind('message:new', messageHandler);
            pusherClient.unbind('message:update', updatedMessageHandler);
            pusherClient.unbind('message:delete', deleteMessageHandler);
        }
    }, [conversationId]);

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox key={message.id} isLast={i === messages.length - 1} data={message} />
            ))}
            <div className="pt-24" ref={bottomRef} />
        </div>
    );
};

export default Body;