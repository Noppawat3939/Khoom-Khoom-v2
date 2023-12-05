import type { Locale } from "@/types";
import { useEffect, useState } from "react";

const useHandleLocale = () => {
  const [currentLocale, setCurrentLocale] = useState<Locale>("en");

  useEffect(() => {
    try {
      const locale = window.localStorage.getItem("locale") as
        | Locale
        | null
        | undefined;

      if (locale) {
        window.localStorage.setItem("locale", locale);
        return setCurrentLocale(locale);
      }

      window.localStorage.setItem("locale", currentLocale);
    } catch {
      window.localStorage.removeItem("locale");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLocaleChange = () => {
    window.localStorage.setItem("locale", currentLocale === "en" ? "th" : "en");

    setCurrentLocale((prev) => (prev === "en" ? "th" : "en"));
  };

  return { state: { locale: currentLocale }, action: { onLocaleChange } };
};

export default useHandleLocale;
