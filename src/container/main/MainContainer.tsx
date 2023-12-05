import { Banner, Container } from "@/components";
import { useAppTheme, useGetContentByLocale, useHandleLocale } from "@/hooks";
import { _string, renderSnowProperties } from "@/utils";
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
    <Container>
      <Banner
        title={_string(content?.main.title_banner)}
        description={_string(content?.main.description_banner)}
        textBtn={_string(content?.main.start_btn_banner)}
        onClick={onLocaleChange}
      />
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
