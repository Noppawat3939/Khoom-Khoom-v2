type TProduct = "productName" | "size" | "id" | "price" | "quantity";

export type Product = Record<TProduct, string>;

export type ProductWithPricePerUnit = {
  id: string;
  productName: string;
  size: number;
  price: number;
  quantity: number;
  pricePerUnit: number;
};

export type MapProductPricePerAmount = {
  id: string;
  pricePerAmount: number;
}[];

export type CleanedProducts = Omit<ProductWithPricePerUnit, "pricePerUnit">[];

export type CompareProducts = {
  data: Product[] | null;
  isEqual: boolean;
  cheaperPercent?: number;
};

export type RemoveProductParam = { removeId: string } | null;
export type UpdateProductParam = { updateId: string } | null;
