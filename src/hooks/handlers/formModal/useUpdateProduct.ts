/* eslint-disable react-hooks/exhaustive-deps */
import { productForm } from "@/constants";
import { useModalStore, useProductsStore } from "@/stores";
import type { UpdateProduct } from "@/types";
import { _string } from "@/utils";
import { identity, isEmpty } from "lodash";
import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

type UpdateProductValues = Record<UpdateProduct, string>;

const useUpdateProduct = () => {
  const updateProductForm = productForm;

  const [updateProductValues, setUpdateProductValues] =
    useState<UpdateProductValues>(updateProductForm);

  const { params, onCloseModal } = useModalStore((store) => ({
    params: store.params,
    onCloseModal: store.onClose,
  }));

  const { products, updatedProduct, selectedId, setSelectedId } =
    useProductsStore((store) => ({
      products: store.products,
      updatedProduct: store.updatedProduct,
      selectedId: store.selectedId,
      setSelectedId: store.setSelectedId,
    }));

  const updateParam = params as { updateId: string } | null;

  const product = products.find((prd) => prd.id === updateParam?.updateId);

  useEffect(() => {
    if (!isEmpty(product)) {
      const { id, ...rest } = product;

      setUpdateProductValues(rest);
    }
  }, [product]);

  const onUpdateProductChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setUpdateProductValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const resetUpdateFormState = useCallback(
    () => setUpdateProductValues(updateProductForm),
    []
  );

  const onSubmitUpdateProductForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = _string(updateParam?.updateId);

    const updateProduct = { ...updateProductValues, id };

    if (!selectedId.includes(id)) {
      setSelectedId(id);
    }

    updatedProduct(updateProduct, id);
    resetUpdateFormState();

    setTimeout(onCloseModal, 300);
  };

  const handleCancelUpdateForm = useCallback(() => {
    onCloseModal();
    resetUpdateFormState();
  }, []);

  const isDisabledSubmit = [
    !updateProductValues.productName.trim(),
    !updateProductValues.price,
    !updateProductValues.size,
  ].some(identity);

  return {
    state: {
      isDisabledSubmit,
      formValues: updateProductForm,
      updateProductValues,
    },
    action: {
      onChange: onUpdateProductChange,
      onSubmit: onSubmitUpdateProductForm,
      onCancel: handleCancelUpdateForm,
    },
  };
};

export default useUpdateProduct;
