import type { CompareProducts, FormModal } from "@/types";
import { create } from "zustand";

type UseModalStore = {
  open: FormModal | null;
  onOpenChange: (_open: FormModal) => void;
  onClose: () => void;
  compareProducts: CompareProducts;
  setCompareProducts: (compareResp: CompareProducts) => void;
  resetCompareProducts: () => void;
};

const initialState = {
  open: null,
  compareProducts: { data: [], isEqual: false },
};

export const useModalStore = create<UseModalStore>((set) => ({
  open: null,
  onOpenChange: (open) => set(() => ({ open })),
  onClose: () => set(() => ({ open: initialState.open })),
  compareProducts: initialState.compareProducts,
  setCompareProducts: (compareProducts) => set(() => ({ compareProducts })),
  resetCompareProducts: () =>
    set(() => ({ compareProducts: initialState.compareProducts })),
}));
