import { useLocaleStore } from "@/stores";
import type { Locale } from "@/types";
import { useEffect, useTransition } from "react";

const useHandleLocale = () => {
  const { locale, setLocale } = useLocaleStore();
  const [, startTransition] = useTransition();

  useEffect(() => {
    try {
      const currentLang = () =>
        window.localStorage.getItem("locale") as Locale | null | undefined;

      if (currentLang() === "en") {
        setLocale("en");
      }

      if (currentLang() === "th") {
        setLocale("th");
      }
    } catch {
      window.localStorage.removeItem("locale");
      setLocale("en");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLocaleChange = () => {
    const newLocale = locale === "en" ? "th" : "en";

    setLocale(newLocale);

    startTransition(() => {
      window.localStorage.setItem("locale", locale === "en" ? "th" : "en");
    });
  };

  return {
    state: { locale, localeLabel: locale.toUpperCase() },
    action: { onLocaleChange },
  };
};

export default useHandleLocale;
