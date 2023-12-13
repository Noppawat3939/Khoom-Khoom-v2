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

  const { products, removedProduct, setSelectedId, selectedId } =
    useProductsStore((store) => ({
      products: store.products,
      removedProduct: store.removedProduct,
      setSelectedId: store.setSelectedId,
      selectedId: store.selectedId,
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
    const _removeId = _string(removeParam?.removeId);

    if (selectedId.includes(_removeId)) {
      setSelectedId(_removeId);
    }

    startTransition(() => {
      removedProduct(_removeId);
      handleCloseModal();
    });
  };

  return {
    state: { content: deleteProductContent, open, product, isPending },
    action: { handleCloseModal, handleRemovedProduct },
  };
};

export default useDeleteProduct;
