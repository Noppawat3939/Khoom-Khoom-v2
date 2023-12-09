"use client";

import { CompareProductModal, FailedModal } from "@/components";
import React, { type FC, type PropsWithChildren } from "react";

type ModalProviderProps = PropsWithChildren;

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  return (
    <main about="modal-provider">
      {children}
      <CompareProductModal />
      <FailedModal />
    </main>
  );
};

export default ModalProvider;
