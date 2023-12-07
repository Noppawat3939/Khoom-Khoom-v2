import React, { PropsWithChildren, type FC } from "react";
import { Drawer as VDrawer } from "vaul";

type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & PropsWithChildren;

const Drawer: FC<DrawerProps> = ({ onOpenChange, open, children }) => {
  return (
    <VDrawer.Root open={open} onOpenChange={onOpenChange}>
      <VDrawer.Overlay className="fixed inset-0 bg-black/30" />
      <VDrawer.Portal>
        <VDrawer.Content className="focus-visible:border-none z-10 focus-visible:outline-none fixed flex flex-col bg-white rounded-t-[20px] bottom-0 left-0 right-0 h-full max-h-[80%] mx-[-1px]">
          {children}
        </VDrawer.Content>
      </VDrawer.Portal>
    </VDrawer.Root>
  );
};

export default Drawer;
