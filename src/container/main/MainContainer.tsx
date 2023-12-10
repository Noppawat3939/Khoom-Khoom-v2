import { Banner, Container, CreateProductForm, SnowBall } from "@/components";
import { useAppTheme, useHandleBanner, useHandleLocale } from "@/hooks";
import { _string } from "@/utils";
import { Button } from "@nextui-org/react";
import React from "react";

const MainContainer = () => {
  const {
    state: {
      times: { isNight },
    },
  } = useAppTheme();

  const {
    state: { locale, localeLabel },
    action: { onLocaleChange },
  } = useHandleLocale();

  const {
    state: { bannerProps, openModal, isFetched },
    action: { handleSetValue, handleCloseModal, handleOpenDeleteModal },
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
        />
      )}

      <span className="absolute right-3 top-1">
        <Button
          isIconOnly
          variant="bordered"
          onClick={onLocaleChange}
          className={`${isNight ? "text-white" : "text-slate-400"} text-md`}
        >
          {localeLabel}
        </Button>
      </span>

      <SnowBall />

      <CreateProductForm
        setValues={handleSetValue}
        open={openModal}
        onClose={handleCloseModal}
      />
    </Container>
  );
};

export default MainContainer;
