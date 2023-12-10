"use client";

import {
  CompareProductModal,
  FailedModal,
  DeleteProductModal,
} from "@/components";
import React, { type FC, type PropsWithChildren } from "react";

type ModalProviderProps = PropsWithChildren;

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  return (
    <main about="modal-provider">
      {children}
      <CompareProductModal />
      <FailedModal />
      <DeleteProductModal />
    </main>
  );
};

export default ModalProvider;
