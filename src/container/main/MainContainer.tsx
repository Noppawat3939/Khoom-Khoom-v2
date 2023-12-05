import { Banner, Container } from "@/components";
import { useAppTheme, useGetContentByLocale, useHandleLocale } from "@/hooks";
import { _string, renderSnowProperties } from "@/utils";
import { Button } from "@nextui-org/react";
import React from "react";
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

  const snowProps = renderSnowProperties(times);

  return (
    <Container className="relative">
      <Banner
        title={_string(content?.main.title_banner)}
        description={_string(content?.main.description_banner)}
        textBtn={_string(content?.main.start_btn_banner)}
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
    </Container>
  );
};

export default MainContainer;
