import type { ModifyProps } from "@/types";

type Key = "add" | "compare";

export type BannerProps = {
  title: string;
  description: string;
  textBtn: string | ModifyProps<Key, string>;
  onClick: ModifyProps<Key, () => void>;
  onRemove: (removeId?: string) => void;
  onUpdate: (updateId?: string) => void;
};
