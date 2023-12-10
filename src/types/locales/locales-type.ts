export type Locale = "en" | "th";

type MainContent =
  | "title_banner"
  | "description_banner"
  | "start_btn_banner"
  | "description_compare_banner"
  | "compare_btn"
  | "add_more_btn";

type ProductFormContent =
  | "title"
  | "product_name_label"
  | "product_name_placeholder"
  | "product_size_label"
  | "product_size_placeholder"
  | "product_quantity_label"
  | "product_quantity_placeholder"
  | "product_price_label"
  | "product_price_placeholder"
  | "submit_product_btn"
  | "cancel_product_btn";

type CompareProductContent =
  | "cheapest_one_product_title"
  | "close_btn"
  | "equal_products_title";

type FailedModalContent = "title" | "description";

type DeleteProductContent = "title" | "delete_btn";

type ProductDetailsContent = "name_label" | "price_label" | "size_label";

export interface ContentByLocale {
  main: Record<MainContent, string>;
  create_product: Record<ProductFormContent, string>;
  update_product: Record<ProductFormContent, string>;
  compare_product: Record<CompareProductContent, string>;
  failed_modal: Record<FailedModalContent, string>;
  delete_product: Record<DeleteProductContent, string>;
  product_details: Record<ProductDetailsContent, string>;
}
