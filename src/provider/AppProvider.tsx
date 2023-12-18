"use client";

import React, {
  useState,
  type FC,
  type PropsWithChildren,
  useLayoutEffect,
} from "react";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryConfigs } from "@/config";
import { ModalProvider } from "@/provider";
import { LoadingModal } from "@/components";

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient(queryConfigs);

  const [init, setInit] = useState(false);

  useLayoutEffect(() => {
    setTimeout(() => setInit(true), 1000);
  }, []);

  if (!init) return <LoadingModal />;

  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>{children}</ModalProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
};

export default AppProvider;
