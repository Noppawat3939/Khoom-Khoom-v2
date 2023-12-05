import React, { type FC, type PropsWithChildren } from "react";

type ContainerProps = {
  className?: string;
} & PropsWithChildren;

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <main about="container" className={className}>
      {children}
    </main>
  );
};

export default Container;
