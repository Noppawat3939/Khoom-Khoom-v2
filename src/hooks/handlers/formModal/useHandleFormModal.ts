import { ACTIVE_MODAL } from "@/constants";
import { useModalStore } from "@/stores";
import { useCallback } from "react";

const useHandleFormModal = () => {
  const { open, onOpenChange, onClose } = useModalStore();

  const handleOpenCreateProduct = () =>
    onOpenChange(ACTIVE_MODAL.CREATE_PRODUCT);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCloseModal = useCallback(() => onClose(), []);

  return {
    action: { handleOpenCreateProduct, handleCloseModal },
    state: { openModal: open },
  };
};

export default useHandleFormModal;
