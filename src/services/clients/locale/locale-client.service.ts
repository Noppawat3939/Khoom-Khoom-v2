import axios, { type AxiosResponse } from "axios";
import { PRE_FIX_PATH, URL } from "@/constants";
import type { GetContentsResponse } from "./type";
import type { Locale } from "@/types";

export const getContentsLocale = async (
  lang?: Locale
): Promise<AxiosResponse<GetContentsResponse>> => {
  return await axios.get(`${PRE_FIX_PATH}${URL.GET_LOCALE}`, {
    params: lang ? { lang } : undefined,
  });
};
