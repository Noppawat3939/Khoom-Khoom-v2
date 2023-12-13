/* eslint-disable react-hooks/exhaustive-deps */

import { useGetContents } from "@/hooks";
import { useModalStore, useProductsStore } from "@/stores";
import type { RemoveProductParam } from "@/types";
import { _string } from "@/utils";
import { useCallback, useTransition } from "react";

const useDeleteProduct = () => {
  const [isPending, startTransition] = useTransition();

  const { open, onClose, params } = useModalStore((store) => ({
    open: store.open,
    onClose: store.onClose,
    onOpenChange: store.onOpenChange,
    params: store.params,
  }));

  const removeParam = params as RemoveProductParam;

  const { products, removedProduct } = useProductsStore((store) => ({
    products: store.products,
    removedProduct: store.removedProduct,
  }));

  const { data: content } = useGetContents();

  const handleCloseModal = useCallback(() => onClose(), []);

  const product = products.find((prd) => prd.id === removeParam?.removeId);

  const deleteProductContent = {
    title: content?.delete_product.title.replaceAll(
      "{{}}",
      _string(product?.productName)
    ),
    delete_btn: _string(content?.delete_product.delete_btn),
  };

  const handleRemovedProduct = () => {
    startTransition(() => {
      removedProduct(_string(removeParam?.removeId));
      handleCloseModal();
    });
  };

  return {
    state: { content: deleteProductContent, open, product, isPending },
    action: { handleCloseModal, handleRemovedProduct },
  };
};

export default useDeleteProduct;
