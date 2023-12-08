import { Product } from "@/types";
import { isEmpty } from "lodash";
import { create } from "zustand";

type UseProductsStore = {
  products: Product[];
  addedProduct: (newProduct: Product[]) => void;
  removedProduct: (id: string) => void;
  clearProducts: () => void;
};

export const useProductsStore = create<UseProductsStore>((set) => ({
  products: [],
  addedProduct: (product) => set(() => ({ products: product })),
  removedProduct: (removedId) =>
    set(({ products: prevProducts }) => ({
      products: !isEmpty(prevProducts)
        ? prevProducts.filter((val) => val.id !== removedId)
        : [],
    })),
  clearProducts: () => set(() => ({ products: [] })),
}));
