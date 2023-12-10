import {
  Banner,
  Container,
  CreateProductForm,
  SnowBall,
  UpdateProductForm,
} from "@/components";
import { useAppTheme, useHandleBanner, useHandleLocale } from "@/hooks";
import { _string } from "@/utils";
import { Button } from "@nextui-org/react";
import React from "react";

const MainContainer = () => {
  const {
    state: { theme },
  } = useAppTheme();

  const {
    state: { locale, localeLabel },
    action: { onLocaleChange },
  } = useHandleLocale();

  const {
    state: { bannerProps, isFetched },
    action: { handleSetValue, handleOpenDeleteModal, handleOpenUpdateProduct },
  } = useHandleBanner(locale);

  return (
    <Container className="relative">
      {isFetched && (
        <Banner
          title={bannerProps.title}
          description={bannerProps.description}
          textBtn={bannerProps.textBtn}
          onClick={bannerProps.onClick}
          productImage={bannerProps.productImage}
          onRemove={handleOpenDeleteModal}
          onUpdate={handleOpenUpdateProduct}
        />
      )}

      <span className="absolute right-3 top-1">
        <Button
          isIconOnly
          variant="bordered"
          onClick={onLocaleChange}
          className={`${theme.dark ? "text-white" : "text-slate-400"} text-md`}
        >
          {localeLabel}
        </Button>
      </span>

      <SnowBall />

      <CreateProductForm setValues={handleSetValue} />
      <UpdateProductForm />
    </Container>
  );
};

export default MainContainer;
