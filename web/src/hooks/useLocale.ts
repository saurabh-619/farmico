import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { en, hi, mr } from "../locales";

const useLocale = () => {
  const [t, setT] = useState(en);
  const { locale, locales } = useRouter();

  useEffect(() => {
    if (locale === "en") setT(en);
    if (locale === "mr") setT(mr);
    if (locale === "hi") setT(hi);
  }, [locale]);

  return { locale, locales, t };
};

export default useLocale;
