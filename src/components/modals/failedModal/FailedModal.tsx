import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import React from "react";
import SadImage from "@/assets/png/sad.png";
import Image from "next/image";
import { useLocaleStore, useModalStore } from "@/stores";
import { ACTIVE_MODAL } from "@/constants";
import { useGetContentByLocale } from "@/hooks";

const FailedModal = () => {
  const { open, onClose } = useModalStore((store) => ({
    open: store.open,
    onClose: store.onClose,
  }));

  const { locale } = useLocaleStore((store) => ({ locale: store.locale }));
  const { data: content } = useGetContentByLocale(locale);

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
            {content?.failed_modal.title}
            <h1 className="font-normal mt-2">
              {content?.failed_modal.description}
            </h1>
          </ModalHeader>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FailedModal;
