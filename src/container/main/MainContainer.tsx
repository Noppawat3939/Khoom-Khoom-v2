import { Banner, Container } from "@/components";
import { useAppTheme } from "@/hooks";
import { renderSnowProperties } from "@/utils";
import React from "react";
import Snowfall from "react-snowfall";

const MainContainer = () => {
  const {
    state: { shouldShowSnowBall, times },
  } = useAppTheme();

  const snowProps = renderSnowProperties(times);

  return (
    <Container>
      <Banner />
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
