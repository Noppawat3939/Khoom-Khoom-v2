"use client";

import { EMPTY_STRING, ZERO } from "@/constants";
import {
  useGetContents,
  useHandleFormModal,
  useMutateCompareProduct,
} from "@/hooks";
import { useProductsStore } from "@/stores";
import { _string } from "@/utils";
import { useCallback, useState } from "react";

const useHandleBanner = () => {
  const { products, selectedId } = useProductsStore((store) => ({
    products: store.products,
    selectedId: store.selectedId,
  }));

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

  console.log(products);

  const {
    action: {
      handleOpenCreateProduct,
      handleCloseModal,
      handleOpenFailedModal,
    },
    state: { openModal },
  } = useHandleFormModal();

  const { data: content, isFetched } = useGetContents();

  const [values, setValues] = useState(0);

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
          compare: () => {
            const _filter = products.filter((prd) =>
              selectedId.includes(prd.id)
            );

            mutateAsync(_filter)
              .then(({ data }) => {
                handleOpenCompareProduct();
                handleSetCompareProducts(data);
              })
              .catch(() => handleOpenFailedModal());
          },
        },
      };
    if (products.length === 1)
      return {
        title,
        textBtn: _string(content?.main.add_more_btn),
        description: _string(content?.main.description_compare_banner),
        onClick: { add: handleOpenCreateProduct, compare: () => null },
      };

    return {
      title,
      textBtn: `${_string(content?.main.start_btn_banner)} ${
        values !== ZERO ? `(${values})` : EMPTY_STRING
      }`,
      description: _string(content?.main.description_banner),
      onClick: { add: handleOpenCreateProduct, compare: () => null },
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
