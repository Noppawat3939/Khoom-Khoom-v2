import { Drawer } from "@/components";
import type { UpdateProduct } from "@/types";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useRenderContentProductForm, useUpdateProduct } from "@/hooks";
import { eq } from "lodash";
import { ACTIVE_MODAL } from "@/constants";
import { useModalStore } from "@/stores";

const UpdateProductForm = () => {
  const {
    state: { formProductContent },
  } = useRenderContentProductForm(ACTIVE_MODAL.UPDATE_PRODUCT);

  const {
    state: { formValues, updateProductValues, isDisabledSubmit },
    action: { onChange, onSubmit, onCancel },
  } = useUpdateProduct();

  const { open, onClose } = useModalStore((store) => ({
    open: store.open,
    onClose: store.onClose,
  }));

  return (
    <Drawer
      open={eq(open, ACTIVE_MODAL.UPDATE_PRODUCT)}
      onOpenChange={(_open) => {
        if (!_open) onClose();
      }}
    >
      <section className="py-[30px] px-4 h-full">
        <form
          onSubmit={onSubmit}
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
                  aria-label={`${key}-update-product-input-value`}
                  variant="flat"
                  label={
                    formProductContent.inputProps[key as UpdateProduct].label
                  }
                  placeholder={
                    formProductContent.inputProps[key as UpdateProduct]
                      .placeholder
                  }
                  key={key}
                  value={updateProductValues[key as UpdateProduct]}
                  size="lg"
                  name={key}
                  onChange={onChange}
                  type={["productName"].includes(key) ? "text" : "number"}
                />
              ))}
            </div>
          </div>
          <footer about="form-footer" className="flex justify-center space-x-3">
            <Button
              type="submit"
              isDisabled={isDisabledSubmit}
              size="lg"
              aria-label="update-product-btn"
              className="text-white"
            >
              {formProductContent.submit_btn}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              aria-label="cancel-update-btn"
              onClick={onCancel}
              className="text-foreground-500"
            >
              {formProductContent.cancel_btn}
            </Button>
          </footer>
        </form>
      </section>
    </Drawer>
  );
};

export default UpdateProductForm;
