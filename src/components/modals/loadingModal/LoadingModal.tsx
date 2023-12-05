"use client";

import { Modal, ModalContent, Spinner } from "@nextui-org/react";
import React, { memo } from "react";

const LoadingModal = () => {
  return (
    <Modal isOpen hideCloseButton>
      <ModalContent className="w-fit bg-transparent shadow-none">
        <Spinner size="lg" color="success" />
      </ModalContent>
    </Modal>
  );
};

export default memo(LoadingModal);
