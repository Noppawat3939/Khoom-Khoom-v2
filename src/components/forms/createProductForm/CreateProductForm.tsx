import { Drawer } from "@/components";
import type { CreateProduct } from "@/types";
import { Button, Input } from "@nextui-org/react";
import React, { type FC } from "react";
import { useCreateProduct, useRenderContentProductForm } from "@/hooks";
import { eq, isEmpty } from "lodash";
import { ACTIVE_MODAL } from "@/constants";

type CreateProductFormProps = {
  setValues: (valueLen: number) => void;
};

const CreateProductForm: FC<CreateProductFormProps> = ({ setValues }) => {
  const {
    state: { formValues, openModal, createProductValues, isDisabledSubmit },
    action,
  } = useCreateProduct();

  const {
    state: { formProductContent },
  } = useRenderContentProductForm(ACTIVE_MODAL.CREATE_PRODUCT);

  return (
    <Drawer
      open={eq(openModal, ACTIVE_MODAL.CREATE_PRODUCT)}
      onOpenChange={(_open) => {
        if (!_open) {
          const valuesLen = Object.values(createProductValues).filter(
            (val) => !isEmpty(val)
          ).length;

          setValues(valuesLen);
          action.onCloseModal();
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
              {formProductContent.title}
            </h1>
            <div className="mt-[5%] flex flex-col gap-5">
              {Object.keys(formValues).map((key) => (
                <Input
                  isRequired={key !== "quantity"}
                  aria-label={`${key}-create-product-input-value`}
                  variant="flat"
                  label={
                    formProductContent.inputProps[key as CreateProduct].label
                  }
                  placeholder={
                    formProductContent.inputProps[key as CreateProduct]
                      .placeholder ?? undefined
                  }
                  key={key}
                  value={createProductValues[key as CreateProduct]}
                  size="lg"
                  name={key}
                  onChange={action.onChange}
                  type={["productName"].includes(key) ? "text" : "number"}
                />
              ))}
            </div>
          </div>
          <footer about="form-footer" className="flex justify-center space-x-3">
            <Button type="submit" size="lg" isDisabled={isDisabledSubmit}>
              {formProductContent.submit_btn}
            </Button>
            <Button size="lg" variant="ghost" onClick={action.onCancel}>
              {formProductContent.cancel_btn}
            </Button>
          </footer>
        </form>
      </section>
    </Drawer>
  );
};

export default CreateProductForm;
