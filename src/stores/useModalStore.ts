import { FormModal } from "@/types";
import { create } from "zustand";

type UseModalStore = {
  open: FormModal | null;
  onOpenChange: (_open: FormModal) => void;
  onClose: () => void;
};

export const useModalStore = create<UseModalStore>((set) => ({
  open: null,
  onOpenChange: (open) => set(() => ({ open })),
  onClose: () => set(() => ({ open: null })),
}));
