import { Product } from "@/types";
import { isEmpty } from "lodash";
import { create } from "zustand";

type UseProductsStore = {
  products: Product[];
  addedProduct: (newProduct: Product[]) => void;
  removedProduct: (id: string) => void;
  clearProducts: () => void;
  canCompareProducts: Boolean;
};

export const useProductsStore = create<UseProductsStore>((set, get) => ({
  products: [],
  addedProduct: (product) => set(() => ({ products: product })),
  removedProduct: (removedId) =>
    set(({ products: prevProducts }) => ({
      products: !isEmpty(prevProducts)
        ? prevProducts.filter((val) => val.id !== removedId)
        : [],
    })),
  clearProducts: () => set(() => ({ products: [] })),
  canCompareProducts: get()?.products?.length
    ? get().products.length >= 2
    : false,
}));
