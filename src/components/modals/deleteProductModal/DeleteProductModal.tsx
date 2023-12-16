import { Button } from "@/components";
import { ACTIVE_MODAL } from "@/constants";
import { useDeleteProduct } from "@/hooks";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { eq } from "lodash";
import React from "react";
import DeleteImage from "@/assets/png/delete.png";
import Image from "next/image";

const DeleteProductModal = () => {
  const {
    state: { open, isPending, content },
    action: { handleCloseModal, handleRemovedProduct },
  } = useDeleteProduct();

  if (!eq(open, ACTIVE_MODAL.DELETE_PRODUCT)) return null;

  return (
    <Modal
      isOpen={eq(open, ACTIVE_MODAL.DELETE_PRODUCT)}
      isKeyboardDismissDisabled
      onClose={handleCloseModal}
    >
      <ModalContent className="p-3">
        <ModalBody>
          <Image
            loading="lazy"
            alt="delete-image"
            className="mt-2 object-cover w-[100px] h-[100px] max-md:w-[80px] max-md:h-[80px] mx-auto"
            src={DeleteImage}
          />
          <ModalHeader className="text-center px-0 text-xl flex-col flex items-center">
            {content.title}
          </ModalHeader>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isPending}
            onClick={handleRemovedProduct}
            className="mx-auto"
            variant="flat"
            color="danger"
            size="lg"
          >
            {content.delete_btn}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteProductModal;
