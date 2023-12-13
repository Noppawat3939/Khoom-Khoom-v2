import type { Product } from "@/types";

export type CardProductProps = {
  onRemove: (removeId?: string) => void;
  onUpdate: (updateId?: string) => void;
  selected: string[];
  onSelectedIdChange?: (selectedId: string) => void;
} & Product;

export type CardProductMobileSizeProps = CardProductProps & {
  order: number;
};
