import { Banner, Container, CreateProductForm } from "@/components";
import {
  useAppTheme,
  useGetContentByLocale,
  useHandleFormModal,
  useHandleLocale,
} from "@/hooks";
import { useProductsStore } from "@/stores";
import { _string, renderSnowProperties } from "@/utils";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import Snowfall from "react-snowfall";

const MainContainer = () => {
  const {
    state: { shouldShowSnowBall, times },
  } = useAppTheme();

  const {
    action: { handleOpenCreateProduct, handleCloseModal },
    state: { openModal },
  } = useHandleFormModal();

  const {
    state: { locale },
    action: { onLocaleChange },
  } = useHandleLocale();

  const { data: content, isFetched } = useGetContentByLocale(locale!);

  const { products } = useProductsStore((store) => ({
    products: store.products,
  }));

  const [values, setValues] = useState(0);

  const snowProps = renderSnowProperties(times);

  const canCompare = products.length >= 2;

  return (
    <Container className="relative">
      {isFetched && (
        <Banner
          title={_string(content?.main.title_banner)}
          description={
            canCompare
              ? _string(content?.main.description_compare_banner)
              : _string(content?.main.description_banner)
          }
          textBtn={
            canCompare
              ? _string(content?.main.compare_btn)
              : `${_string(content?.main.start_btn_banner)} ${
                  values !== 0 ? `(${values})` : ""
                }`
          }
          onClick={handleOpenCreateProduct}
        />
      )}

      <span className="absolute right-3 top-1">
        <Button
          isIconOnly
          variant="bordered"
          onClick={onLocaleChange}
          className={`${
            times.isNight ? "text-white" : "text-slate-400"
          } text-md`}
        >
          {locale.toUpperCase()}
        </Button>
      </span>
      {shouldShowSnowBall && (
        <Snowfall
          color={snowProps.color}
          snowflakeCount={snowProps.snowflakeCount}
        />
      )}
      <CreateProductForm
        setValues={setValues}
        open={openModal}
        onClose={handleCloseModal}
      />
    </Container>
  );
};

export default MainContainer;
