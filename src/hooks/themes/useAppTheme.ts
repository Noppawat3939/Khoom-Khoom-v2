import { setDate } from "@/utils";
import dayjs from "dayjs";

const HOURS = { AFTERNOON: 12, NIGHT: 18 } as const;
const HAS_RAIN_DATE = [12, 25];

const useAppTheme = () => {
  const afternoon = setDate({ hour: HOURS.AFTERNOON }).toISOString();
  const night = setDate({ hour: HOURS.NIGHT }).toISOString();

  const times = {
    isMorning: dayjs().isBefore(afternoon),
    isAfternoon: dayjs().isAfter(afternoon) && dayjs().isBefore(night),
    isNight: dayjs().isAfter(night),
  };

  const shouldShowSnowBall = false;

  const shouldShowRain = HAS_RAIN_DATE.includes(
    +dayjs().startOf("date").format("DD")
  );

  const theme = {
    light: [times.isAfternoon, times.isMorning].some(Boolean),
    dark: times.isNight,
  };

  return {
    state: { shouldShowSnowBall, times, theme, shouldShowRain },
  };
};

export default useAppTheme;
