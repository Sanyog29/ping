import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

interface IParams {
    conversationId?: string;
};

const getMessages = async (conversationId: string) => {
    try {
        const currentUser = await getCurrentUser();

        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                sender: true,
                seenUsers: true,
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return messages;
    } catch (error) {
        return null;
    }
};

export default getMessages;     