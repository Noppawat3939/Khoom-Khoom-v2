import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { locales } from "@/locales";
import type { Locale } from "@/types";
import { HttpStatusCode } from "axios";

export const GET = () => {
  const { get } = headers();

  const lang = get("lang") as Locale;

  if (!["th", "en"].includes(lang))
    return NextResponse.json(
      { error: true, message: "header is required" },
      { status: HttpStatusCode.BadRequest }
    );

  return NextResponse.json({ data: locales[lang] });
};
