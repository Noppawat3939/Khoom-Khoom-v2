/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { productForm } from "@/constants";
import { useModalStore, useProductsStore } from "@/stores";
import { CreateProduct } from "@/types";
import { identity } from "lodash";
import { type ChangeEvent, useCallback, useState, type FormEvent } from "react";
import { v4 as uuid } from "uuid";

type CreateProductValues = Record<CreateProduct, string>;

const useCreateProduct = () => {
  const createProductForm = productForm;

  const { openModal, onCloseModal } = useModalStore((store) => ({
    openModal: store.open,
    onCloseModal: store.onClose,
  }));

  const { products, addedProduct, productId, setProductId } = useProductsStore(
    (store) => ({
      products: store.products,
      addedProduct: store.addedProduct,
      productId: store.selectedId,
      setProductId: store.setSelectedId,
    })
  );

  const [createProductValues, setCreateProductValues] =
    useState<CreateProductValues>(createProductForm);

  const onCreateProductChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;

      setCreateProductValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const onResetCreateProductValues = useCallback(
    () => setCreateProductValues(createProductForm),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSubmitCreateProductForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProduct = { ...createProductValues, id: uuid() };

    addedProduct([...products, newProduct]);

    const newSelected = newProduct.id;
    setProductId(newSelected);
    setTimeout(onResetCreateProductValues, 300);
  };

  const handleCancelForm = useCallback(() => {
    onCloseModal();
    onResetCreateProductValues();
  }, []);

  const isDisabledSubmit = [
    !createProductValues.productName.trim(),
    !createProductValues.price,
    !createProductValues.size,
  ].some(identity);

  return {
    state: {
      openModal,
      createProductValues,
      isDisabledSubmit,
      formValues: createProductForm,
    },
    action: {
      onChange: onCreateProductChange,
      onSubmit: onSubmitCreateProductForm,
      resetForm: onResetCreateProductValues,
      onCloseModal,
      onCancel: handleCancelForm,
    },
  };
};

export default useCreateProduct;
