import type { Times } from "@/types";

export const renderSnowProperties = (times: Times) => {
  if (times.isMorning) return { snowflakeCount: 50, color: "white" };
  if (times.isAfternoon) return { snowflakeCount: 100, color: "#dee4fd" };

  return { snowflakeCount: 200, color: "white" };
};
