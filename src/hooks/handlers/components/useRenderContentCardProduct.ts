import { VARIABLE_CONTENT } from "@/constants";
import { useGetContentByLocale } from "@/hooks";
import { useLocaleStore } from "@/stores";
import { _string } from "@/utils";

type UseRenderContentCardProductParams = { price: string; size: string };

const useRenderContentCardProduct = (
  params: UseRenderContentCardProductParams
) => {
  const { locale } = useLocaleStore((store) => ({ locale: store.locale }));
  const { data } = useGetContentByLocale(locale);

  const productDetailsContent = {
    price: _string(
      data?.product_details.price_label.replaceAll(
        VARIABLE_CONTENT,
        params.price
      )
    ),
    size: _string(
      data?.product_details.size_label.replaceAll(VARIABLE_CONTENT, params.size)
    ),
  };

  return { content: productDetailsContent };
};

export default useRenderContentCardProduct;
