import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { locales } from "@/locales";
import type { Locale } from "@/types";
import { HttpStatusCode } from "axios";

const LOCALES = ["th", "en"] as const;

export const GET = () => {
  const { get } = headers();

  const lang = get("lang") as Locale;

  if (!LOCALES.includes(lang))
    return NextResponse.json(
      { error: true, message: "header is required" },
      { status: HttpStatusCode.BadRequest }
    );

  return NextResponse.json({ data: locales[lang] });
};
