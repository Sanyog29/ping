'use client'

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Inputs"
import Select from "@/app/components/inputs/Select"
import Button from "@/app/components/Button";

interface GroupchatModalProps {
    isOpen: boolean;
    onClose: () => void;
    users: User[];
}

const GroupchatModal: React.FC<GroupchatModalProps> = ({ isOpen, onClose, users }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    });

    const members = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/conversations', {
            ...data,
            isGroup: true
        }).then(() => {
            router.refresh();
            onClose();
            toast.success('Group chat created!');
        }).catch(() => {
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center sm:text-left">
                        <div className="flex items-center gap-3 mb-2">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                                }}
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Create a group chat
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Add members to start a conversation
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                    {/* Form fields */}
                    <div className="space-y-5">
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            id="name"
                            label="Group Name"
                            required
                        />
                        <Select
                            disabled={isLoading}
                            label="Members"
                            options={users.map((user) => ({
                                value: user.id,
                                label: user.name
                            }))}
                            onChange={(value) => setValue('members', value, { shouldValidate: true })}
                            value={members}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                        <Button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            secondary
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating...
                                </span>
                            ) : (
                                'Create Group'
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
};

export default GroupchatModal;