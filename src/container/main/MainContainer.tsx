import { Banner, Container, CreateProductForm, Drawer } from "@/components";
import {
  useAppTheme,
  useFormModal,
  useGetContentByLocale,
  useHandleLocale,
} from "@/hooks";
import { _string, renderSnowProperties } from "@/utils";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import Snowfall from "react-snowfall";

const MainContainer = () => {
  const {
    state: { shouldShowSnowBall, times },
  } = useAppTheme();

  const {
    state: { locale },
    action: { onLocaleChange },
  } = useHandleLocale();

  const { data: content } = useGetContentByLocale(locale!);
  const [values, setValues] = useState(0);

  const { state, action } = useFormModal();

  const snowProps = renderSnowProperties(times);

  return (
    <Container className="relative">
      <Banner
        title={_string(content?.main.title_banner)}
        description={_string(content?.main.description_banner)}
        textBtn={`${_string(content?.main.start_btn_banner)} ${
          values !== 0 ? `(${values})` : ""
        }`}
        onClick={() => action.handleOpenModal("create-form")}
      />
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
        open={state.openForm}
        onClose={action.handleCloseModal}
      />
    </Container>
  );
};

export default MainContainer;
