'use client'
import userRoutes from "@/app/hooks/userRoutes";
import Link from "next/link";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client"
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";


interface DesktopSidebarProps {
    currentUser: User;
}


const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
    const routes = userRoutes();
    const [isOpen, setIsOpen] = useState(false);
    console.log(currentUser);
    return (<>
        <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} currentUser={currentUser} />
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:overflow-y-auto lg:bg-white lg:pt-5 lg:pb-4 lg:px-3 lg:shadow-lg lg:w-20 lg:border-r-[1px] lg:flex lg:flex-col justify-between h-full">
            <nav className="mt-4 flex flex-col justify-between">
                <ul role="list" className="flex flex-col items-center space-y-1">
                    {routes.map(item => (
                        <DesktopItem key={item.label} href={item.href} label={item.label} icon={item.icon} active={item.isActive} onClick={item.onClick} />

                    ))}
                </ul>
            </nav>
            <nav className="mt-4 flex flex-col justify-between">
                <div onClick={() => setIsOpen(true)} className="cursor-pointer hover:opacity-75 transition">
                    <Avatar user={currentUser} />
                </div>
            </nav>
        </div>
    </>
    )
}

export default DesktopSidebar;
