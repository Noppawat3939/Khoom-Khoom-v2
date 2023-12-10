import { FIRST_INDEX, QUERY_KEY } from "@/constants";
import { useMutationState } from "@tanstack/react-query";

const useMutateStateCompareProduct = () => {
  const status = useMutationState({
    filters: { mutationKey: [QUERY_KEY.COMPARE] },
    select: (mutation) => mutation.state.status,
  });

  const isPending = status?.at(FIRST_INDEX) === "pending";

  return { isPending };
};

export default useMutateStateCompareProduct;
