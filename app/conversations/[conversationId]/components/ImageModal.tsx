'use client'

import Modal from "@/app/components/Modal";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    src: string;
}


const ImageModal = ({ isOpen, onClose, src }: { isOpen: boolean; onClose: () => void; src: string }) => {
    if (!src) return null;


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex items-center justify-center h-full w-full">
                <img src={src} alt="Image" className="w-full h-full fill object-cover" />
            </div>
        </Modal>
    );
};

export default ImageModal;