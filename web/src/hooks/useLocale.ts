import { useStore } from "@/lib/store";
import { useRouter } from "next/router";

const useLocale = () => {
  const { locale, locales } = useRouter();
  return { locale, locales };
};

export default useLocale;
