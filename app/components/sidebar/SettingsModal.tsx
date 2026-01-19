'use client'

import Modal from "../Modal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";


interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentUser }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser.name,
            image: currentUser.image,
        }
    });

    const name = watch('name');
    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, { shouldValidate: true });
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsLoading(true);
            const user = await axios.post('/api/settings', data)
                .then(() => { router.refresh(); onClose(); });
        } catch (error) {
            toast.error('Something went wrong.');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Edit your public information.
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                    disabled={isLoading}
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Image
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image src={image || currentUser?.image || '/images/placeholder.jpg'} alt="Profile" className="rounded-full" width={40} height={40} />
                                    <CldUploadButton options={{ maxFiles: 1 }} onSuccess={handleUpload} uploadPreset="ping_chat">
                                        <span className="inline-flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer">
                                            Change
                                        </span>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={onClose}
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </Modal >
    )
}



export default SettingsModal;
