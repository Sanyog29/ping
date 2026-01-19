import { Channel, Members } from "pusher-js";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useActiveList from "./useActiveList";
import { pusherClient } from "../libs/pusher";

const useActiveChannels = () => {
    const { set, add, remove } = useActiveList();
    const { data: session, status } = useSession();
    const [activechannels, setActiveChannels] = useState<Channel | null>(null);

    useEffect(() => {
        // Only subscribe to Pusher when authenticated
        if (status !== 'authenticated' || !session?.user?.email) {
            return;
        }

        let channel = activechannels;
        if (!channel) {
            channel = pusherClient.subscribe('presence-user');
            setActiveChannels(channel);
            channel.bind('pusher:subscription_succeeded', (members: Members) => {
                const initialMembers: string[] = [];
                members.each((member: Record<string, any>) => {
                    initialMembers.push(member.id);
                });
                set(initialMembers);
            });
            channel.bind('pusher:member_added', (member: Record<string, any>) => {
                add(member.id);
            });
            channel.bind('pusher:member_removed', (member: Record<string, any>) => {
                remove(member.id);
            });
        }

        return () => {
            if (activechannels) {
                pusherClient.unsubscribe('presence-user');
                setActiveChannels(null);
            }
        };
    }, [activechannels, set, add, remove, session, status]);
};

export default useActiveChannels;