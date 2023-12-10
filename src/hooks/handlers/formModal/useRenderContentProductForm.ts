import { ACTIVE_MODAL } from "@/constants";
import { useGetContentByLocale } from "@/hooks";
import { useLocaleStore, useModalStore, useProductsStore } from "@/stores";
import type { FormModal, UpdateProductParam } from "@/types";
import { _string } from "@/utils";
import { eq } from "lodash";

type UseRenderContentProductForm = Exclude<
  FormModal,
  "compare-product-modal" | "failed-modal" | "delete-product-modal"
>;

const useRenderContentProductForm = (
  activeForm: UseRenderContentProductForm
) => {
  const { locale } = useLocaleStore((store) => ({ locale: store.locale }));
  const { data: content } = useGetContentByLocale(locale);

  const { params } = useModalStore((store) => ({ params: store.params }));
  const { products } = useProductsStore((store) => ({
    products: store.products,
  }));

  const updateParam = params as UpdateProductParam;

  const product = products.find((prd) => prd.id === updateParam?.updateId);

  const activeCreate = eq(activeForm, ACTIVE_MODAL.CREATE_PRODUCT);

  const inputProps = {
    productName: {
      placeholder: _string(
        activeCreate
          ? content?.create_product.product_name_placeholder
          : content?.update_product.product_name_placeholder
      ),
      label: _string(
        activeCreate
          ? content?.create_product.product_name_label
          : content?.update_product.product_name_label
      ),
    },
    quantity: {
      label: _string(
        activeCreate
          ? content?.create_product.product_quantity_label
          : content?.update_product.product_quantity_label
      ),
      placeholder: _string(
        activeCreate
          ? content?.create_product.product_quantity_placeholder
          : content?.update_product.product_quantity_placeholder
      ),
    },
    size: {
      placeholder: _string(
        activeCreate
          ? content?.create_product.product_size_placeholder
          : content?.update_product.product_size_placeholder
      ),
      label: _string(
        activeCreate
          ? content?.create_product.product_size_label
          : content?.update_product.product_size_label
      ),
    },
    price: {
      placeholder: _string(
        activeCreate
          ? content?.create_product.product_price_placeholder
          : content?.update_product.product_price_placeholder
      ),
      label: _string(
        activeCreate
          ? content?.create_product.product_price_label
          : content?.update_product.product_price_label
      ),
    },
  };

  const formProductContent = {
    inputProps,
    title: _string(
      activeCreate
        ? content?.create_product.title
        : content?.update_product.title?.replaceAll(
            "{{}}",
            _string(product?.productName)
          )
    ),
    submit_btn: _string(
      activeCreate
        ? content?.create_product.submit_product_btn
        : content?.update_product.submit_product_btn
    ),
    cancel_btn: _string(
      activeCreate
        ? content?.create_product.cancel_product_btn
        : content?.update_product.cancel_product_btn
    ),
  };

  return { state: { formProductContent } };
};

export default useRenderContentProductForm;
