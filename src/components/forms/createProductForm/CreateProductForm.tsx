import { Drawer } from "@/components";
import { CreateProduct, FormModal } from "@/types";
import { Button, Input } from "@nextui-org/react";
import React, { type FC } from "react";
import { useCreateProduct, useGetContentByLocale } from "@/hooks";
import { isEmpty } from "lodash";
import { useLocaleStore } from "@/stores";

type CreateProductFormProps = {
  open?: FormModal | null;
  onClose: () => void;
  setValues: (valueLen: number) => void;
};

const CreateProductForm: FC<CreateProductFormProps> = ({
  open = null,
  onClose,
  setValues,
}) => {
  const { state, action } = useCreateProduct();

  const { locale } = useLocaleStore((store) => ({ locale: store.locale }));
  const { data: content } = useGetContentByLocale(locale);

  const createProductInputProps = {
    productName: {
      placeholder: content?.create_product.product_name_placeholder,
      label: content?.create_product.product_name_label,
    },
    quantity: {
      label: content?.create_product.product_quantity_label,
      placeholder: content?.create_product.product_quantity_placeholder,
    },
    size: {
      placeholder: content?.create_product.product_size_placeholder,
      label: content?.create_product.product_size_label,
    },
    price: {
      placeholder: content?.create_product.product_price_placeholder,
      label: content?.create_product.product_price_label,
    },
  };

  const onCancelForm = () => {
    onClose();
    action.resetForm();
  };

  return (
    <Drawer
      open={open === "create-form"}
      onOpenChange={(_open) => {
        if (!_open) {
          const valuesLen = Object.values(state.createProductValues).filter(
            (val) => !isEmpty(val)
          ).length;

          setValues(valuesLen);
          onClose();
        }
      }}
    >
      <section className="py-[30px] px-4 h-full">
        <form
          onSubmit={action.onSubmit}
          className="max-w-[85%] h-full mx-auto flex flex-col justify-between"
        >
          <div>
            <h1 className="text-3xl text-foreground-600 font-semibold text-center">
              {content?.create_product.title}
            </h1>
            <div className="mt-[5%] flex flex-col gap-5">
              {Object.keys(state.createProductForm).map((key) => (
                <Input
                  aria-label={`${key}-input-value`}
                  variant="flat"
                  label={createProductInputProps[key as CreateProduct].label}
                  placeholder={
                    createProductInputProps[key as CreateProduct].placeholder ??
                    undefined
                  }
                  key={key}
                  value={state.createProductValues[key as CreateProduct]}
                  size="lg"
                  name={key}
                  onChange={action.onCreateProductChange}
                  type={["productName"].includes(key) ? "text" : "number"}
                />
              ))}
            </div>
          </div>
          <footer about="form-footer" className="flex justify-center space-x-3">
            <Button type="submit" size="lg" isDisabled={state.isDisabledSubmit}>
              {content?.create_product.create_product_btn}
            </Button>
            <Button size="lg" variant="ghost" onClick={onCancelForm}>
              {content?.create_product.cancel_product_btn}
            </Button>
          </footer>
        </form>
      </section>
    </Drawer>
  );
};

export default CreateProductForm;
