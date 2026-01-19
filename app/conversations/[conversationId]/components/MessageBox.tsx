'use client';

import { FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import Image from "next/image";
import { useState, useCallback } from "react";
import ImageModal from "./ImageModal";
import axios from "axios";
import { HiTrash } from "react-icons/hi2";

interface MessageBoxProps {
    isLast: boolean;
    data: FullMessageType;
}

const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {
    const session = useSession();
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const isOwn = session?.data?.user?.email === data?.sender?.email;
    const seenList = (data.seenUsers || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(', ');

    const handleDelete = useCallback(() => {
        setIsDeleting(true);
        axios.delete(`/api/messages/${data.id}`)
            .catch((error) => {
                console.error('Error deleting message:', error);
            })
            .finally(() => {
                setIsDeleting(false);
            });
    }, [data.id]);

    const container = clsx(
        'flex gap-3 p-4 group',
        isOwn && 'justify-end'
    );

    const avatar = clsx(isOwn && 'order-2');

    const body = clsx(
        'flex flex-col gap-1',
        isOwn && 'items-end'
    );

    const message = clsx(
        'text-sm w-fit overflow-hidden',
        isOwn
            ? 'msg-gradient-own text-white shadow-[var(--shadow-soft)]'
            : 'msg-gradient-other text-[hsl(25_65%_20%)] border border-[hsl(38_30%_88%)]',
        data.image ? 'rounded-xl p-0' : 'rounded-2xl py-2.5 px-4'
    );

    const formattedTime = format(new Date(data.createdAt), 'p');

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-2">
                    {!isOwn && (
                        <span className="text-sm font-semibold text-[hsl(25_65%_20%)]">
                            {data.sender.name}
                        </span>
                    )}
                    <span className="text-xs text-[hsl(25_25%_45%)]">
                        {formattedTime}
                    </span>
                    {isOwn && (
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="
                                opacity-0 
                                group-hover:opacity-100
                                transition-opacity
                                p-1
                                rounded-full
                                hover:bg-[hsl(0_72%_51%/0.1)]
                                text-[hsl(25_25%_45%)]
                                hover:text-[hsl(0_72%_51%)]
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                            title="Delete message"
                        >
                            <HiTrash size={14} />
                        </button>
                    )}
                </div>
                <div className={message}>
                    <ImageModal
                        isOpen={imageModalOpen}
                        onClose={() => setImageModalOpen(false)}
                        src={data.image || ''}
                    />
                    {data.image ? (
                        <Image
                            src={data.image}
                            onClick={() => setImageModalOpen(true)}
                            alt="Image"
                            width={288}
                            height={288}
                            className="object-cover cursor-pointer rounded-xl hover:scale-105 transition-transform"
                        />
                    ) : (
                        <p>{data.body}</p>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs text-[hsl(25_25%_45%)] mt-1">
                        Seen by {seenList}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageBox;

