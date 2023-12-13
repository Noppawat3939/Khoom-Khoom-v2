import type { ContentByLocale, Locale } from "@/types";

export type GetContentsResponse = {
  data: Record<Locale, ContentByLocale>;
};
