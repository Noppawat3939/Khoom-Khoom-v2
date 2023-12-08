import {
  useGetContentByLocale,
  useHandleFormModal,
  useMutateCompareProduct,
} from "@/hooks";
import { useProductsStore } from "@/stores";
import { Locale } from "@/types";
import { _string } from "@/utils";
import { useCallback, useState } from "react";

const useHandleBanner = (locale: Locale) => {
  const { products } = useProductsStore((store) => ({
    products: store.products,
  }));

  const { mutateAsync } = useMutateCompareProduct();

  const canCompare = products.length ? products.length >= 2 : false;

  const {
    action: { handleOpenCreateProduct, handleCloseModal },
    state: { openModal },
  } = useHandleFormModal();

  const { data: content, isFetched } = useGetContentByLocale(locale);
  const [values, setValues] = useState(0);

  const handleBannerProps = () => {
    const title = _string(content?.main.title_banner);

    if (canCompare)
      return {
        title,
        textBtn: _string(content?.main.compare_btn),
        description: _string(content?.main.description_compare_banner),
        onClick: () => mutateAsync(products),
      };
    if (products.length === 1)
      return {
        title,
        textBtn: _string(content?.main.add_more_btn),
        description: _string(content?.main.description_compare_banner),
        onClick: handleOpenCreateProduct,
      };

    return {
      title,
      textBtn: `${_string(content?.main.start_btn_banner)} ${
        values !== 0 ? `(${values})` : ""
      }`,
      description: _string(content?.main.description_banner),
      onClick: handleOpenCreateProduct,
    };
  };

  const handleSetValue = useCallback((value: number) => setValues(value), []);

  return {
    state: { bannerProps: handleBannerProps(), openModal, isFetched },
    action: { handleSetValue, handleCloseModal },
  };
};

export default useHandleBanner;
