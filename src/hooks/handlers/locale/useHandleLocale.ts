import { useLocaleStore } from "@/stores";
import type { Locale } from "@/types";
import { useEffect } from "react";

const useHandleLocale = () => {
  const { locale, setLocale } = useLocaleStore();

  useEffect(() => {
    try {
      const _locale = window.localStorage.getItem("locale") as
        | Locale
        | null
        | undefined;

      if (_locale) {
        window.localStorage.setItem("locale", locale);

        setLocale(locale);

        return;
      }

      window.localStorage.setItem("locale", locale);
    } catch {
      window.localStorage.removeItem("locale");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLocaleChange = () => {
    window.localStorage.setItem("locale", locale === "en" ? "th" : "en");

    const newLocale = locale === "en" ? "th" : "en";

    setLocale(newLocale);
  };

  return { state: { locale }, action: { onLocaleChange } };
};

export default useHandleLocale;
