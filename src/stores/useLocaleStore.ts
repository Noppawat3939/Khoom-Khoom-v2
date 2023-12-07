import type { Locale } from "@/types";
import { create } from "zustand";

type UseLocaleStore = {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
};

export const useLocaleStore = create<UseLocaleStore>((set) => ({
  locale: "en",
  setLocale: (locale) => set(() => ({ locale })),
}));
