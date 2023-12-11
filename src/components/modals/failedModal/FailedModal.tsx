import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import SadImage from "@/assets/png/sad.png";
import Image from "next/image";
import { useModalStore } from "@/stores";
import { ACTIVE_MODAL } from "@/constants";
import { useRenderContentFailedModal } from "@/hooks";

const FailedModal = () => {
  const { content } = useRenderContentFailedModal();

  const { open, onClose } = useModalStore((store) => ({
    open: store.open,
    onClose: store.onClose,
  }));

  if (open !== ACTIVE_MODAL.FAILED) return null;

  return (
    <Modal size="2xl" isOpen={open === ACTIVE_MODAL.FAILED} onClose={onClose}>
      <ModalContent>
        <ModalBody className="flex py-5 flex-col justify-center items-center">
          <Image
            src={SadImage}
            alt="failed-image"
            className="w-[100px] object-cover h-[100px] mx-auto"
          />
          <ModalHeader className="p-0 text-xl flex-col flex items-center">
            {content.title}
            <h1 className="font-normal mt-2">{content.description}</h1>
          </ModalHeader>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FailedModal;
