import { EMPTY_STRING, ZERO } from "@/constants";

export const _string = (value?: string | null) => value ?? EMPTY_STRING;
export const _number = (value?: number | null) => value ?? ZERO;
