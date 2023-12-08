import { useProductsStore } from "@/stores";
import { CreateProduct } from "@/types";
import { identity } from "lodash";
import {
  type ChangeEvent,
  useCallback,
  useState,
  type FormEvent,
  useId,
} from "react";

type CreateProductValues = Record<CreateProduct, string>;

const useCreateProduct = () => {
  const createProductForm = {
    productName: "",
    size: "",
    quantity: "",
    price: "",
  };

  const _id = useId();

  const { products, addedProduct } = useProductsStore((store) => ({
    products: store.products,
    addedProduct: store.addedProduct,
  }));

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

    const newProduct = { ...createProductValues, id: _id };

    addedProduct([...products, newProduct]);
    setTimeout(onResetCreateProductValues, 300);
  };

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
