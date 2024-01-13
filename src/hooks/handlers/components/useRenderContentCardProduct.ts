import { VARIABLE_CONTENT } from "@/constants";
import { useGetContents } from "@/hooks";
import { _string } from "@/utils";

type UseRenderContentCardProductParams = { price: string; size: string };

const useRenderContentCardProduct = (
  params: UseRenderContentCardProductParams
) => {
  const { data: content } = useGetContents();

  const productDetailsContent = {
    price: _string(
      content?.product_details.price_label.replaceAll(
        VARIABLE_CONTENT,
        params.price
      )
    ),
    size: _string(
      content?.product_details.size_label.replaceAll(
        VARIABLE_CONTENT,
        params.size
      )
    ),
    tooltipContent: {
      edit: _string(content?.card_product.edit_tooltip),
      remove: _string(content?.card_product.remove_tooltip),
      quantity: _string(content?.card_product.quantity_tooltip),
    },
  };

  return { content: productDetailsContent };
};

export default useRenderContentCardProduct;
