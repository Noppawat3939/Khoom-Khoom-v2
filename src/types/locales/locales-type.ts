export type Locale = "en" | "th";

type MainContent = "title_banner" | "description_banner" | "start_btn_banner";

export interface ContentByLocale {
  main: Record<MainContent, string>;
}
