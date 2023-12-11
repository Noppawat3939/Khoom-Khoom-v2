import React, { type FC } from "react";
import "./rain.css";
import type { RainProps } from "./rain-type";
import { useAppTheme, useRenderRain } from "@/hooks";

const Rain: FC<RainProps> = ({ drops = 30 }) => {
  const {
    state: { shouldShowRain },
  } = useAppTheme();

  useRenderRain(drops, shouldShowRain);

  return <div className="rain-container" id="rain-container" />;
};

export default Rain;
