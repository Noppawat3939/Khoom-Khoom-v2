import { Product } from "@/types";
import { isEmpty } from "lodash";
import { create } from "zustand";

type UseProductsStore = {
  selectedId: string[];
  products: Product[];
  addedProduct: (newProduct: Product[]) => void;
  removedProduct: (id: string) => void;
  clearProducts: () => void;
  updatedProduct: (newProduct: Product, productId: string) => void;
  setSelectedId: (id: string) => void;
};

export const useProductsStore = create<UseProductsStore>((set) => ({
  selectedId: [],
  products: [],
  addedProduct: (product) => set(() => ({ products: product })),
  removedProduct: (removedId) =>
    set(({ products: prevProducts }) => ({
      products: !isEmpty(prevProducts)
        ? prevProducts.filter((val) => val.id !== removedId)
        : [],
    })),
  clearProducts: () => set(() => ({ products: [] })),
  updatedProduct: (updateProduct, updateId) =>
    set(({ products: prevProducts }) => ({
      products: prevProducts.map((product) =>
        product.id === updateId ? { ...product, ...updateProduct } : product
      ),
    })),
  setSelectedId: (id) =>
    set(({ selectedId: prevSelected }) => ({
      selectedId:
        prevSelected.length && prevSelected.includes(id)
          ? prevSelected.filter((v) => v !== id)
          : [...prevSelected, id],
    })),
}));
