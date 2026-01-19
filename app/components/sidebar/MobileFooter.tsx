'use client'

import useConversation from "@/app/hooks/useConversation";
import userRoutes from "@/app/hooks/userRoutes";
import MobileItem from "./MobileItem";


const MobileFooter = () => {
    const routes = userRoutes();
    const { isOpen } = useConversation();

    if (isOpen) {
        return null;
    }

    return (
        <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
            {routes.map((route) => (
                <MobileItem key={route.label} href={route.href} icon={route.icon} active={route.isActive} onClick={route.onClick} />
            ))}
        </div>
    )
}

export default MobileFooter;
