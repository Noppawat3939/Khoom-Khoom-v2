import { PRE_FIX_PATH, URL } from "@/constants";
import type { Locale } from "@/types";
import axios, { type AxiosResponse } from "axios";
import type { GetContentResponse } from "./type";

export const getContent = async (
  lang: Locale
): Promise<AxiosResponse<GetContentResponse>> => {
  return await axios.get(`${PRE_FIX_PATH}${URL.GET_CONTENT}`, {
    headers: { lang },
  });
};
