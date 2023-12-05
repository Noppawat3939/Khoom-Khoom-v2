import React, { type FC, type PropsWithChildren } from "react";

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <main about="container">{children}</main>;
};

export default Container;
