import React, { type FC, Suspense, type PropsWithChildren } from "react";
import { LoadingModal } from "../..";

const LazyLoad: FC<PropsWithChildren> = ({ children }) => {
  return <Suspense fallback={<LoadingModal />}>{children}</Suspense>;
};

export default LazyLoad;
