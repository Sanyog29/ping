import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";

import { HiChat } from "react-icons/hi";

import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

const userRoutes = () => {
    const pathname = usePathname();
    const { conversationId } = useConversation();

    const routes = useMemo(() => [
        {
            label: "Chat",
            href: `/conversations`,
            icon: HiChat,
            isActive: pathname === `conversations` || !!conversationId,
        },
        {
            label: "Users",
            href: `/users`,
            icon: HiUsers,
            isActive: pathname === `/users`,
        },
        {
            label: "Logout",
            href: `#`,
            icon: HiArrowLeftOnRectangle,
            onClick: () => signOut(),
        },
    ], [pathname, conversationId]);
    return routes;
}

export default userRoutes;
