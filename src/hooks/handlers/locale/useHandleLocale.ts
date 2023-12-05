import type { Locale } from "@/types";
import { useCallback, useEffect, useState } from "react";

const useHandleLocale = () => {
  const [currentLocale, setCurrentLocale] = useState<Locale | null>(null);

  useEffect(() => {
    try {
      const locale = window.localStorage.getItem("locale") as
        | Locale
        | null
        | undefined;

      if (locale) {
        return setCurrentLocale(locale);
      }

      return setCurrentLocale("en");
    } catch {
      window.localStorage.removeItem("locale");
    }
  }, []);

  useEffect(() => {
    if (currentLocale) {
      window.localStorage.setItem("locale", currentLocale);
    }
  }, [currentLocale]);

  const onLocaleChange = useCallback(() => {
    setCurrentLocale((prev) => (prev === "en" ? "th" : "en"));
  }, []);

  return { state: { locale: currentLocale }, action: { onLocaleChange } };
};

export default useHandleLocale;
