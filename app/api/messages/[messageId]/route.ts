import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
    messageId?: string;
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<IParams> }
) {
    try {
        const { messageId } = await params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!messageId) {
            return new NextResponse("Invalid Message ID", { status: 400 });
        }

        // Find the message and verify ownership
        const existingMessage = await prisma.message.findUnique({
            where: {
                id: messageId,
            },
            include: {
                sender: true,
                conversation: {
                    include: {
                        users: true,
                    },
                },
            },
        });

        if (!existingMessage) {
            return new NextResponse("Message not found", { status: 404 });
        }

        // Only the sender can delete their message
        if (existingMessage.senderId !== currentUser.id) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        // Delete the message
        const deletedMessage = await prisma.message.delete({
            where: {
                id: messageId,
            },
        });

        // Trigger Pusher event to notify all users in the conversation
        await pusherServer.trigger(
            existingMessage.conversationId,
            'message:delete',
            { id: messageId }
        );

        return NextResponse.json(deletedMessage);
    } catch (error) {
        console.error(error, "ERROR_MESSAGE_DELETE");
        return new NextResponse("Internal Error", { status: 500 });
    }
}
