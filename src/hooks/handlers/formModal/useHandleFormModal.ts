/* eslint-disable react-hooks/exhaustive-deps */
import { ACTIVE_MODAL } from "@/constants";
import { useModalStore } from "@/stores";
import type { CompareProducts } from "@/types";
import { useCallback } from "react";

const useHandleFormModal = () => {
  const {
    open,
    onOpenChange,
    onClose,
    setCompareProducts,
    resetCompareProducts,
    setParams,
  } = useModalStore();

  const handleOpenCreateProduct = useCallback(
    () => onOpenChange(ACTIVE_MODAL.CREATE_PRODUCT),
    []
  );

  const handleOpenCompareProduct = useCallback(
    () => onOpenChange(ACTIVE_MODAL.COMPARE_PRODUCT),
    []
  );

  const handleOpenFailedModal = useCallback(
    () => onOpenChange(ACTIVE_MODAL.FAILED),
    []
  );

  const handleOpenDeleteModal = useCallback((removeId?: string) => {
    setParams({ removeId });
    onOpenChange(ACTIVE_MODAL.DELETE_PRODUCT);
  }, []);

  const handleSetCompareProducts = (compareResponse: CompareProducts) =>
    setCompareProducts(compareResponse);

  const handleResetCompareProducts = useCallback(resetCompareProducts, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCloseModal = useCallback(onClose, []);

  return {
    action: {
      handleOpenCompareProduct,
      handleOpenCreateProduct,
      handleCloseModal,
      handleSetCompareProducts,
      handleResetCompareProducts,
      handleOpenFailedModal,
      handleOpenDeleteModal,
    },
    state: { openModal: open },
  };
};

export default useHandleFormModal;
