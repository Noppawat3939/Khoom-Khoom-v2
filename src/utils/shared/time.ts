import type { TDate } from "@/types";
import dayjs from "dayjs";
import { _number } from ".";

type SetDate = { date: TDate; hour: number; minute: number; second: number };

export const setDate = (params: Partial<SetDate>) => {
  return dayjs(params.date)
    .set("hour", _number(params?.hour))
    .set("minute", _number(params?.minute))
    .set("second", _number(params?.second));
};
