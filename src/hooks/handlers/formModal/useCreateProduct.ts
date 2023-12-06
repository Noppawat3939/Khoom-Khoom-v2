import { CreateProduct } from "@/types";
import { identity } from "lodash";
import { type ChangeEvent, useCallback, useState, type FormEvent } from "react";

type CreateProductValues = Record<CreateProduct, string>;

const useCreateProduct = () => {
  const createProductForm = {
    productName: "",
    size: "",
    quantity: "",
    price: "",
  };

  const [createProductValues, setCreateProductValues] =
    useState<CreateProductValues>(createProductForm);

  const onCreateProductChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;

      setCreateProductValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const onSubmitCreateProductForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("submit", createProductValues);
    },
    []
  );

  const onResetCreateProductValues = useCallback(
    () => setCreateProductValues(createProductForm),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const isDisabledSubmit = [
    !createProductValues.productName.trim(),
    !createProductValues.price,
    !createProductValues.size,
  ].some(identity);

  return {
    state: { createProductValues, isDisabledSubmit, createProductForm },
    action: {
      onCreateProductChange,
      onSubmit: onSubmitCreateProductForm,
      resetForm: onResetCreateProductValues,
    },
  };
};

export default useCreateProduct;
