import { useGetContentByLocale } from "@/hooks";
import { useLocaleStore, useModalStore } from "@/stores";
import { _string } from "@/utils";

const useCompareProducts = () => {
  const { locale } = useLocaleStore((store) => ({ locale: store.locale }));
  const { data: content } = useGetContentByLocale(locale);

  const { open, comparedData, resetComparedData, onClose } = useModalStore(
    (store) => ({
      open: store.open,
      comparedData: store.compareProducts,
      resetComparedData: store.resetCompareProducts,
      onClose: store.onClose,
    })
  );

  const handleCloseModal = () => {
    resetComparedData();
    onClose();
  };

  const hasOne = comparedData?.data
    ? comparedData?.data?.length == 1 && !comparedData.isEqual
    : false;

  const hasMoreThanOne = comparedData?.data
    ? comparedData?.data?.length > 1 && !comparedData.isEqual
    : false;

  const hasEqual = comparedData.isEqual;

  const mapContentCompareModal = () => {
    // has one product is cheapest or has more than one product is cheapest
    if (hasOne || hasMoreThanOne)
      return {
        title: _string(content?.compare_product.cheapest_one_product_title),
        close_btn: _string(content?.compare_product.close_btn),
      };

    // has equal values
    return {
      title: _string(content?.compare_product.equal_products_title),
      close_btn: _string(content?.compare_product.close_btn),
    };
  };

  return {
    state: {
      open,
      productCount: { hasMoreThanOne, hasOne, hasEqual },
      data: comparedData,
      content: mapContentCompareModal(),
    },
    action: { handleCloseModal },
  };
};

export default useCompareProducts;
