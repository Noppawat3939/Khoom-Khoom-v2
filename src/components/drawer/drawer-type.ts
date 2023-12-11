import { type PropsWithChildren } from "react";

export type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & PropsWithChildren;
