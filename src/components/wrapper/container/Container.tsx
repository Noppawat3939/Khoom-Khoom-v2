import React, { type FC, type PropsWithChildren } from "react";

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main about="container" className="max-sm:px-[3%]">
      {children}
    </main>
  );
};

export default Container;
