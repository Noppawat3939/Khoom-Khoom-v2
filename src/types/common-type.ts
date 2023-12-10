import { type Dayjs } from "dayjs";

export type ModifyProps<K extends string, V> = Record<K, V>;

export type TDate = Date | string | number | Dayjs;
