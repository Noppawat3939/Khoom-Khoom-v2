type TProduct = "productName" | "size" | "id" | "price" | "quantity";

export type Product = Record<TProduct, string>;

export type MapProductPricePerAmount = {
  id: string;
  pricePerAmount: number;
}[];

export type CompareProducts = { data: Product[] | null; isEqual: boolean };
