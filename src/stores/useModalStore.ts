import type { CompareProducts, FormModal } from "@/types";
import { create } from "zustand";

type UseModalStore = {
  open: FormModal | null;
  onOpenChange: (_open: FormModal) => void;
  onClose: () => void;
  compareProducts: CompareProducts;
  setCompareProducts: (compareResp: CompareProducts) => void;
  resetCompareProducts: () => void;
  params: Record<string, unknown> | null;
  setParams: (param?: Record<string, unknown> | null) => void;
};

const initialState = {
  open: null,
  params: null,
  compareProducts: { data: [], isEqual: false },
};

export const useModalStore = create<UseModalStore>((set) => ({
  open: null,
  params: null,
  onOpenChange: (open) => set(() => ({ open })),
  onClose: () =>
    set(() => ({ open: initialState.open, params: initialState.params })),
  compareProducts: initialState.compareProducts,
  setCompareProducts: (compareProducts) => set(() => ({ compareProducts })),
  resetCompareProducts: () =>
    set(() => ({ compareProducts: initialState.compareProducts })),
  setParams: (params) => set(() => ({ params })),
}));
