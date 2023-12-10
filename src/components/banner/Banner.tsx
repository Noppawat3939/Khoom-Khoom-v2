import { useAppTheme, useMutateStateCompareProduct } from "@/hooks";
import React, { type FC } from "react";
import { Button, CardProduct } from "..";
import { useProductsStore } from "@/stores";
import { isEmpty, isObject, isString } from "lodash";
import type { ModifyProps } from "@/types";

type Key = "add" | "compare";

type BannerProps = {
  title: string;
  description: string;
  textBtn: string | ModifyProps<Key, string>;
  productImage: string;
  onClick: ModifyProps<Key, () => void>;
  onRemove: (removeId?: string) => void;
  onUpdate: (updateId?: string) => void;
};

const Banner: FC<BannerProps> = ({
  title,
  description,
  textBtn,
  onClick,
  onRemove,
  onUpdate,
  productImage,
}) => {
  const {
    state: { times, theme },
  } = useAppTheme();

  const { isPending } = useMutateStateCompareProduct();

  const { products } = useProductsStore((store) => ({
    products: store.products,
  }));

  return (
    <section
      about="banner-section"
      className={`
      ${
        times.isNight
          ? "from-foreground-900 from-40% to-[#2b5988]"
          : times.isMorning
          ? "from-[#caddff]"
          : "from-[#F3F3F3]"
      } bg-gradient-to-b w-full flex flex-col h-[95vh] max-sm:h-screen pt-[12%] items-center max-sm:px-[3%] max-sm:pt-[10%]`}
    >
      <h1
        className={`${
          times.isNight
            ? "from-slate-500  to-slate-300 to-90%"
            : "from-green-500 to-[#1B9C85]"
        } text-[7rem] text-center max-lg:text-[5rem] max-md-[5rem] max-sm:[2rem] max-md:leading-tight font-semibold bg-gradient-to-r inline-block text-transparent bg-clip-text`}
      >
        {title}
      </h1>
      <p className="text-2xl max-md:text-xl text-foreground-400">
        {description}
      </p>

      {products.length <= 1 ? (
        <Button
          onClick={onClick.add}
          className={`mt-5 text-lg ${
            times.isNight ? "text-foreground-100" : "text-gray-400"
          }`}
          variant="bordered"
          about="create-product-btn"
        >
          {isString(textBtn) && textBtn}
        </Button>
      ) : (
        <div className="flex space-x-3 max-sm:flex-col">
          <Button
            isLoading={isPending}
            onClick={onClick.add}
            className={`mt-5 text-lg ${
              theme.dark ? "text-foreground-100" : "text-gray-400"
            }`}
            variant="bordered"
            about="create-product-btn"
          >
            {isObject(textBtn) && textBtn.add}
          </Button>
          <Button
            isDisabled={isPending}
            onClick={onClick.compare}
            className={`mt-5 text-lg ${
              theme.dark ? "text-foreground-700" : "text-gray-100"
            }`}
            variant={theme.dark ? "shadow" : "solid"}
            color="default"
            about="compare-product-btn"
          >
            {isObject(textBtn) && textBtn.compare}
          </Button>
        </div>
      )}

      <br />
      <section
        about="render-product-details"
        className="gap-6 max-md:gap-4 min-w-[80%] max-md:max-h-[55%] justify-center max-sm:min-w-[95%] grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:overflow-y-auto max-sm:grid-cols-1"
      >
        {!isEmpty(products) &&
          products.map((product) => (
            <CardProduct
              {...product}
              image={productImage}
              key={product.id}
              onRemove={onRemove}
              onUpdate={onUpdate}
            />
          ))}
      </section>
    </section>
  );
};

export default Banner;
