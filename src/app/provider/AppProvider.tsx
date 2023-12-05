"use client";

import React, { type FC, type PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default AppProvider;
