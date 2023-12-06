import { FormModal } from "@/types";
import { useCallback, useState } from "react";

const useFormModal = () => {
  const [openForm, setOpenForm] = useState<FormModal | null>(null);

  const handleOpenModal = useCallback(
    (_open: FormModal) => setOpenForm(_open),
    []
  );

  const handleCloseModal = useCallback(() => setOpenForm(null), []);

  return { state: { openForm }, action: { handleOpenModal, handleCloseModal } };
};

export default useFormModal;
