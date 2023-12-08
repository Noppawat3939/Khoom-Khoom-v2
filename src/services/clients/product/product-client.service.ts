import { PRE_FIX_PATH, URL } from "@/constants";
import { Product } from "@/types";
import axios, { type AxiosResponse } from "axios";
import type { CompareProductResponse } from "./type";

export const compareProducts = async (
  products: Product[]
): Promise<AxiosResponse<CompareProductResponse>> => {
  return await axios.post(`${PRE_FIX_PATH}${URL.COMPARE_PRODUCTS}`, products);
};
