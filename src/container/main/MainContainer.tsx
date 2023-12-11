"use client";

import React from "react";
import {
  Banner,
  Container,
  CreateProductForm,
  Rain,
  SnowBall,
  UpdateProductForm,
} from "@/components";
import { useHandleBanner, useHandleLocale } from "@/hooks";
import { _string } from "@/utils";
import { Button } from "@nextui-org/react";

const MainContainer = () => {
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
          onRemove={handleOpenDeleteModal}
          onUpdate={handleOpenUpdateProduct}
        />
      )}

      {isFetched && (
        <Button
          isIconOnly
          onClick={onLocaleChange}
          size="sm"
          aria-label="change-locale-btn"
          className="text-sm fixed right-3 top-1 mt-1 bg-white"
        >
          {localeLabel}
        </Button>
      )}

      <SnowBall />
      <Rain />

      <CreateProductForm setValues={handleSetValue} />
      <UpdateProductForm />
    </Container>
  );
};

export default MainContainer;
