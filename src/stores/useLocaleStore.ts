import type { Locale } from "@/types";
import { create } from "zustand";

type UseLocaleStore = {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
};

export const useLocaleStore = create<UseLocaleStore>((set) => ({
  locale: (window.localStorage.getItem("locale") as Locale) ?? "en",
  setLocale: (locale) => set(() => ({ locale })),
}));
