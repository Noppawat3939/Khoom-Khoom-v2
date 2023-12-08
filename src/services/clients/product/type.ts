import type { Product } from "@/types";

export type CompareProductResponse = {
  data: Product[] | null;
  isEqual: boolean;
};
