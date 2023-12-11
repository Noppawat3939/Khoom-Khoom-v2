import React, { type FC } from "react";
import type { ContainerProps } from "./container-type";

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <main about="container" className={className}>
      {children}
    </main>
  );
};

export default Container;
