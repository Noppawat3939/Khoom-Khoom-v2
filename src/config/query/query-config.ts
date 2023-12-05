import { type QueryClientConfig } from "@tanstack/react-query";

export const queryConfigs = {
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
} as QueryClientConfig;
