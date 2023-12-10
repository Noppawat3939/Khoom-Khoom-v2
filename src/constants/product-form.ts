import { Product } from "@/types";

// for render initial-state
export const productForm = {
  productName: "",
  size: "",
  price: "",
  quantity: "",
} as Omit<Product, "id">;
