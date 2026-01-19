'use client'

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
    items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
    return (
        <aside className="fixed top-0 left-0 h-[calc(100vh-5rem)] lg:h-screen pb-20 lg:pb-0 lg:left-20 w-full lg:w-80 overflow-y-auto border-r border-gray-200 bg-white z-30">
            <div className="px-5">
                <div className="flex-col">
                    <div className="text-2xl font-bold text-neutral-800 py-4">
                        People
                    </div>
                </div>
                {items.map((item) => (
                    <UserBox key={item.id} data={item} />
                ))}
            </div>
        </aside>
    );
};

export default UserList;