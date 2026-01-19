import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
    sender: User;
    seenUsers: User[];
};

export type FullConversationType = Conversation & {
    users: User[];
    messages: FullMessageType[];
};
