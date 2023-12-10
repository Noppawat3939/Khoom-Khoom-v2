import { QUERY_KEY } from "@/constants";
import { getContent } from "@/services";
import type { Locale } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useGetContentByLocale = (locale: Locale) => {
  return useQuery({
    queryFn: () => getContent(locale),
    queryKey: [QUERY_KEY.GET_CONTENT, locale],
    select: (res) => res.data.data,
  });
};

export default useGetContentByLocale;
