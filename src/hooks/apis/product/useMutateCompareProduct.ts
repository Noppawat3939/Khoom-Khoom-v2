import { compareProducts } from "@/services";
import { useMutation } from "@tanstack/react-query";

const useMutateCompareProduct = () => {
  return useMutation({
    mutationFn: compareProducts,
    mutationKey: ["compareProducts"],
  });
};

export default useMutateCompareProduct;
