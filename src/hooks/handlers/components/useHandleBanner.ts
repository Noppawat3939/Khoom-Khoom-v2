"use client";

import { EMPTY_STRING, ZERO } from "@/constants";
import {
  useAppTheme,
  useGetContentByLocale,
  useHandleFormModal,
  useMutateCompareProduct,
} from "@/hooks";
import { useProductsStore } from "@/stores";
import type { Locale } from "@/types";
import { _string } from "@/utils";
import { useCallback, useState } from "react";

const useHandleBanner = (locale: Locale) => {
  const { products } = useProductsStore((store) => ({
    products: store.products,
  }));

  const {
    state: { times },
  } = useAppTheme();

  const {
    action: {
      handleOpenCompareProduct,
      handleSetCompareProducts,
      handleOpenDeleteModal,
      handleOpenUpdateProduct,
    },
  } = useHandleFormModal();

  const { mutateAsync } = useMutateCompareProduct();

  const canCompare = products.length ? products.length >= 2 : false;

  const {
    action: {
      handleOpenCreateProduct,
      handleCloseModal,
      handleOpenFailedModal,
    },
    state: { openModal },
  } = useHandleFormModal();

  const { data: content, isFetched } = useGetContentByLocale(locale);
  const [values, setValues] = useState(0);

  const renderProductImage = (): string => {
    if (times.isMorning)
      return "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    if (times.isAfternoon)
      return "https://images.unsplash.com/photo-1422207049116-cfaf69531072?q=80&w=2035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return "https://images.unsplash.com/photo-1494698853255-d0fa521abc6c?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  };

  const handleBannerProps = () => {
    const title = _string(content?.main.title_banner);

    if (canCompare)
      return {
        title,
        textBtn: {
          compare: _string(content?.main.compare_btn),
          add: _string(content?.main.add_more_btn),
        },
        description: _string(content?.main.description_compare_banner),
        onClick: {
          add: handleOpenCreateProduct,
          compare: () =>
            mutateAsync(products)
              .then(({ data }) => {
                handleOpenCompareProduct();
                handleSetCompareProducts(data);
              })
              .catch(() => handleOpenFailedModal()),
        },
        productImage: renderProductImage(),
      };
    if (products.length === 1)
      return {
        title,
        textBtn: _string(content?.main.add_more_btn),
        description: _string(content?.main.description_compare_banner),
        onClick: { add: handleOpenCreateProduct, compare: () => null },
        productImage: renderProductImage(),
      };

    return {
      title,
      textBtn: `${_string(content?.main.start_btn_banner)} ${
        values !== ZERO ? `(${values})` : EMPTY_STRING
      }`,
      description: _string(content?.main.description_banner),
      onClick: { add: handleOpenCreateProduct, compare: () => null },
      productImage: renderProductImage(),
    };
  };

  const handleSetValue = useCallback((value: number) => setValues(value), []);

  return {
    state: { bannerProps: handleBannerProps(), openModal, isFetched },
    action: {
      handleSetValue,
      handleCloseModal,
      handleOpenDeleteModal,
      handleOpenUpdateProduct,
    },
  };
};

export default useHandleBanner;
