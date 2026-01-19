import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();

        const { message, image, conversationId } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!conversationId) {
            return new NextResponse("Invalid Conversation", { status: 400 });
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message || '',
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seenUsers: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                seenUsers: true,
                sender: true
            }
        });

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seenUsers: true
                    }
                }
            }
        });

        await pusherServer.trigger(conversationId, 'message:new', newMessage);

        const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

        updatedConversation.users.forEach((user) => {
            pusherServer.trigger(user.email!, 'conversation:update', { id: conversationId, message: lastMessage })
        });

        return NextResponse.json(newMessage);
    } catch (error) {
        console.log(error, "ERROR_MESSAGES");
        return new NextResponse("Internal Error", { status: 500 });
    }
}
