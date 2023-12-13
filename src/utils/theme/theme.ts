import type { Times } from "@/types";

export const renderSnowProperties = (times: Times, isMobile?: boolean) => {
  if (times.isMorning) return { snowflakeCount: 50, color: "white" };
  if (times.isAfternoon)
    return { snowflakeCount: isMobile ? 20 : 100, color: "#dee4fd" };

  return { snowflakeCount: isMobile ? 20 : 150, color: "white" };
};
