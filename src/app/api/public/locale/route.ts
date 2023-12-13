import { locales } from "@/locales";
import { Locale } from "@/types";
import { toUpperCase } from "@/utils";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["th", "en"] as const;

export const GET = (req: NextRequest) => {
  const lang = req.nextUrl?.searchParams
    ?.get("lang")
    ?.toLowerCase() as Locale | null;

  if (lang && !LOCALES.includes(lang)) {
    return NextResponse.json(
      { error: true, message: toUpperCase("lang is invalid") },
      { status: HttpStatusCode.BadRequest }
    );
  }

  if (lang) {
    return NextResponse.json({ data: locales[lang] });
  }

  return NextResponse.json({ data: locales });
};
