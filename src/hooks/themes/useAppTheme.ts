import dayjs from "dayjs";

const useAppTheme = () => {
  const firstDayOfNewYear = dayjs("2024-01-01");

  const afternoon = dayjs().set("hour", 12).toISOString();
  const night = dayjs().set("hour", 18).toISOString();

  const times = {
    isMorning: dayjs().isBefore(afternoon),
    isAfternoon: dayjs().isAfter(afternoon) && dayjs().isBefore(night),
    isNight: dayjs().isAfter(night),
  };

  const shouldShowSnowBall = firstDayOfNewYear.isAfter(dayjs());

  return {
    state: { shouldShowSnowBall, times },
  };
};

export default useAppTheme;
