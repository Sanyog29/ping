'use client'

import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { useMemo, useState } from "react";
import Avatar from "@/app/components/Avatar";
import { HiChevronLeft } from "react-icons/hi";
import Link from "next/link";
import { HiEllipsisHorizontal, HiEllipsisVertical } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
    conversation: Conversation & {
        users: User[];
    }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1;
    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }
        return isActive ? 'Active now' : 'Offline';
    }, [conversation, isActive]);

    return (<>
        <ProfileDrawer
            data={conversation}
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}

        />
        <div className="bg-white border-b w-full flex items-center justify-between px-4 py-3 lg:px-6 shadow-sm">
            <div className="flex items-center gap-3">
                <Link href="/conversations" className="lg:hidden block cursor-pointer hover:text-sky-600 transition">
                    <HiChevronLeft
                        size={32}
                        className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
                    />
                </Link>
                {conversation.isGroup ? (
                    <AvatarGroup users={conversation.users} />
                ) : (
                    <Avatar user={otherUser} />
                )}
                <div className="flex flex-col">
                    <div className="text-sm font-semibold text-gray-900">
                        {conversation.isGroup ? conversation.name : otherUser.name}
                    </div>
                    <div className="text-xs font-medium text-gray-500">
                        {statusText}
                    </div>
                </div>
            </div>
            <HiEllipsisHorizontal
                size={32}
                onClick={() => setDrawerOpen(true)}
                className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
            />
        </div>
    </>
    );
};

export default Header;
