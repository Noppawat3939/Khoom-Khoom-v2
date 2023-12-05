"use client";

import React, { type FC, type PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryConfigs } from "@/config";

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient(queryConfigs);

  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextUIProvider>
  );
};

export default AppProvider;
