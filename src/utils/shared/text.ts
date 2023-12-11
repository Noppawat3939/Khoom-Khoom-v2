import type { Product } from "@/types";

export const renderSeparate = (products: Product[], index: number) =>
  products.length && index !== products.length - 1 ? "," : "";
