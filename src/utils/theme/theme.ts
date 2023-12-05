import { Times } from "@/types";

export const renderBannerStyles = (times: Times) => {
  if (times.isMorning)
    return {
      bg: "from-[#caddff]",
      headerColor: "from-green-500 to-[#1B9C85]",
    };
  if (times.isAfternoon)
    return {
      bg: "from-[#F3F3F3]",
      headerColor: "from-green-500 to-[#1B9C85]",
    };
  if (times.isNight)
    return {
      bg: "from-foreground-900 to-[#06283D]",
      headerColor: "from-green-500",
    };
};

export const renderSnowProperties = (times: Times) => {
  if (times.isMorning) return { snowflakeCount: 50, color: "white" };
  if (times.isAfternoon) return { snowflakeCount: 100, color: "#dee4fd" };
  return { snowflakeCount: 200, color: "white" };
};
