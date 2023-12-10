import { setDate } from "@/utils";
import dayjs from "dayjs";

const HOURS = { AFTERNOON: 12, NIGHT: 18 } as const;

const useAppTheme = () => {
  const firstDayOfNewYear = dayjs().startOf("year").add(1, "year");

  const afternoon = setDate({ hour: HOURS.AFTERNOON }).toISOString();
  const night = setDate({ hour: HOURS.NIGHT }).toISOString();

  const times = {
    isMorning: dayjs().isBefore(afternoon),
    isAfternoon: dayjs().isAfter(afternoon) && dayjs().isBefore(night),
    isNight: dayjs().isAfter(night),
  };

  const shouldShowSnowBall = firstDayOfNewYear.isAfter(dayjs());

  const theme = {
    light: [times.isAfternoon, times.isMorning].some(Boolean),
    dark: times.isNight,
  };

  return {
    state: { shouldShowSnowBall, times, theme },
  };
};

export default useAppTheme;
