import { useAppTheme } from "@/hooks";
import { renderSnowProperties } from "@/utils";
import React from "react";
import Snowfall from "react-snowfall";

const SnowBall = () => {
  const {
    state: { times, shouldShowSnowBall },
  } = useAppTheme();
  const snowProps = renderSnowProperties(times);

  if (!shouldShowSnowBall) return null;

  return (
    <Snowfall
      color={snowProps.color}
      snowflakeCount={snowProps.snowflakeCount}
    />
  );
};

export default SnowBall;
