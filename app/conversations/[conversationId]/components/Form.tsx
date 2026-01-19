'use client';

import useConversation from "@/app/hooks/useConversation";
import { useForm } from "react-hook-form";
import { FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";

const Form = () => {

    const { conversationId } = useConversation();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });
        axios.post('/api/messages', {
            ...data,
            conversationId
        });
    }

    const handleUpload = (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
            axios.post('/api/messages', {
                image: result?.info?.secure_url,
                conversationId
            });
        }
    }

    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onSuccess={handleUpload}
                uploadPreset="ping_chat"
            >
                <HiPhoto size={20} color="gray" />
            </CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
            >
                <MessageInput id="message" register={register} errors={errors} type="text" required placeholder="Type a message..." />
                <button type="submit" className="rounded-full p-2 bg-neutral-500 cursor-pointer hover:bg-neutral-600 transition">
                    <HiPaperAirplane size={18} className="text-white" />
                </button>
            </form>
        </div >
    );
};

export default Form;