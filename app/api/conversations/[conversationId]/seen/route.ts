import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";

import prisma from "@/app/libs/prismadb";


interface IParams {
    conversationId?: string;
};

export async function POST(
    request: Request,
    { params }: { params: Promise<IParams> }
) {
    try {
        const currentUser = await getCurrentUser();

        const {
            conversationId
        } = await params;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId

            },
            include: {
                messages: {
                    include: {
                        seenUsers: true
                    }
                },
                users: true,
            }
        }
        );

        if (!conversation) {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if (!lastMessage) {
            return NextResponse.json(conversation)
        }

        // Check if the user has already seen this message
        if (lastMessage.seenUsers.some((user) => user.email === currentUser.email)) {
            return NextResponse.json(conversation);
        }

        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id,
            },
            include: {
                sender: true,
                seenUsers: true,
            },
            data: {
                seenUsers: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        });

        // Notify the current user's channel about the conversation update
        await pusherServer.trigger(currentUser.email!, 'conversation:update', {
            id: conversationId,
            messages: [updatedMessage]
        });

        // Notify the conversation channel that someone has seen the message
        await pusherServer.trigger(conversationId!, 'message:update', updatedMessage);

        return NextResponse.json(updatedMessage);

    } catch (err: any) {
        console.log(err, " ERROR_MESSAGES_SEEN")
        return new NextResponse("Internal Error", { status: 500 })
    }
}