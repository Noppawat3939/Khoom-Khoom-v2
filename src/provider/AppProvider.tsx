"use client";

import React, { type FC, type PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryConfigs } from "@/config";
import { ModalProvider } from ".";

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient(queryConfigs);

  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>{children}</ModalProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
};

export default AppProvider;
