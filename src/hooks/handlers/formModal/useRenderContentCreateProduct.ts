import { useGetContentByLocale } from "@/hooks";
import { useLocaleStore } from "@/stores";

const useRenderContentCreateProduct = () => {
  const { locale } = useLocaleStore((store) => ({ locale: store.locale }));
  const { data: content } = useGetContentByLocale(locale);

  const inputProps = {
    productName: {
      placeholder: content?.create_product.product_name_placeholder,
      label: content?.create_product.product_name_label,
    },
    quantity: {
      label: content?.create_product.product_quantity_label,
      placeholder: content?.create_product.product_quantity_placeholder,
    },
    size: {
      placeholder: content?.create_product.product_size_placeholder,
      label: content?.create_product.product_size_label,
    },
    price: {
      placeholder: content?.create_product.product_price_placeholder,
      label: content?.create_product.product_price_label,
    },
  };

  const createProductContent = { inputProps, content };

  return { state: { createProductContent } };
};

export default useRenderContentCreateProduct;
