import { QUERY_KEY } from "@/constants";
import { getContentsLocale } from "@/services";
import { useLocaleStore } from "@/stores";
import type { Locale } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useGetContents = (_locale?: Locale) => {
  const { locale } = useLocaleStore((store) => ({ locale: store.locale }));

  return useQuery({
    queryKey: [QUERY_KEY.GET_CONTENT],
    queryFn: () => getContentsLocale(_locale),
    select: ({ data }) => data.data?.[locale],
    refetchOnMount: false,
  });
};

export default useGetContents;
