import { PRE_FIX_PATH, URL } from "@/constants";
import { Product } from "@/types";
import axios, { type AxiosResponse } from "axios";

export const compareProducts = async (
  products: Product[]
): Promise<AxiosResponse> => {
  return await axios.post(`${PRE_FIX_PATH}${URL.COMPARE_PRODUCTS}`, products);
};
