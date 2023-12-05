import React, { FC, PropsWithChildren } from "react";
import {
  Button as NxUiButton,
  ButtonProps as NxUiButtonProps,
} from "@nextui-org/react";

type ButtonProps = {
  className?: string;
} & PropsWithChildren &
  NxUiButtonProps;

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <NxUiButton className={className} {...rest}>
      {children}
    </NxUiButton>
  );
};

export default Button;
