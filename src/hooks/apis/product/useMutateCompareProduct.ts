import { QUERY_KEY } from "@/constants";
import { compareProducts } from "@/services";
import { useMutation } from "@tanstack/react-query";

const useMutateCompareProduct = () => {
  return useMutation({
    mutationFn: compareProducts,
    mutationKey: [QUERY_KEY.COMPARE],
  });
};

export default useMutateCompareProduct;
