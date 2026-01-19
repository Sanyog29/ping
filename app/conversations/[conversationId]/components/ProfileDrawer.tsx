'use client';

import { Fragment, useMemo, useState } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { IoClose, IoTrash } from 'react-icons/io5';
import { Conversation, User } from "@prisma/client";
import Avatar from '@/app/components/Avatar';
import AvatarGroup from '@/app/components/AvatarGroup';
import useOtherUser from '@/app/hooks/useOtherUser';
import { format } from 'date-fns';
import ConfirmModal from './ConfirmModal';
import useActiveList from '@/app/hooks/useActiveList';

interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    data: Conversation & {
        users: User[];
    };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose, data }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { members } = useActiveList();
    const otherUser = useOtherUser(data);
    const isActive = members.indexOf(otherUser?.email!) !== -1;

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP');
    }, [otherUser.createdAt]);

    const title = useMemo(() => {
        return data.name || otherUser.name;
    }, [data.name, otherUser.name]);

    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`;
        }
        return isActive ? 'Active now' : 'Offline';
    }, [data, isActive]);

    return (<>
        <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} />
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Background overlay */}
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                </TransitionChild>

                {/* Drawer panel */}
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <TransitionChild
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-200"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                                        {/* Close button */}
                                        <div className="px-4 sm:px-6">
                                            <div className="flex items-start justify-end">
                                                <button
                                                    type="button"
                                                    className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                                                    onClick={onClose}
                                                >
                                                    <IoClose size={24} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Profile content */}
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <div className="flex flex-col items-center">
                                                <div className="mb-4">
                                                    {data.isGroup ? (
                                                        <AvatarGroup users={data.users} />
                                                    ) : (
                                                        <Avatar user={otherUser} />
                                                    )}
                                                </div>
                                                <h2 className="text-xl font-semibold text-gray-900">
                                                    {title}
                                                </h2>
                                                <p className="text-sm text-gray-500">
                                                    {statusText}
                                                </p>

                                                {/* Delete button */}
                                                <div className="flex gap-10 my-8">
                                                    <div
                                                        onClick={() => setConfirmOpen(true)}
                                                        className="flex flex-col items-center cursor-pointer hover:opacity-75 transition"
                                                    >
                                                        <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                                                            <IoTrash size={20} className="text-rose-500" />
                                                        </div>
                                                        <div className="text-sm font-light text-neutral-600 mt-1">
                                                            Delete
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Details */}
                                                <div className="w-full pt-5 sm:px-0 sm:pt-0">
                                                    <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                                        {data.isGroup && (
                                                            <div>
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                    Members
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                    {data.users.map(user => user.name).join(', ')}
                                                                </dd>
                                                            </div>
                                                        )}
                                                        {!data.isGroup && (
                                                            <div>
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                    Email
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                    {otherUser.email}
                                                                </dd>
                                                            </div>
                                                        )}
                                                        <hr />
                                                        <div>
                                                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                Joined
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                <time dateTime={joinedDate}>
                                                                    {joinedDate}
                                                                </time>
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
    );
};

export default ProfileDrawer;