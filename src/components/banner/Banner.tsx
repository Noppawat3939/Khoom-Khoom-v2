import React, { type FC } from "react";
import {
  useAppTheme,
  useMediaQuery,
  useMutateStateCompareProduct,
} from "@/hooks";
import { Button, CardProduct, CardProductMobileSize } from "..";
import { useProductsStore } from "@/stores";
import { isEmpty, isObject, isString } from "lodash";
import { Badge } from "@nextui-org/react";
import type { BannerProps } from "./banner-type";

const Banner: FC<BannerProps> = ({
  title,
  description,
  textBtn,
  onClick,
  onRemove,
  onUpdate,
}) => {
  const {
    state: { times, theme },
  } = useAppTheme();

  const { isMobile } = useMediaQuery();

  const { isPending } = useMutateStateCompareProduct();

  const { products, selected, toggleSelectedId } = useProductsStore(
    (store) => ({
      products: store.products,
      selected: store.selectedId,
      toggleSelectedId: store.setSelectedId,
    })
  );

  const shouldRenderCardMobileSize = isMobile && !isEmpty(products);
  const shouldRenderCardPcOrTabletSize = !isMobile && !isEmpty(products);

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
      <p className="text-2xl max-md:text-xl max-sm:text-lg max-sm:mt-3 text-foreground-400">
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
        <div className="flex items-baseline space-x-3 max-sm:flex-col max-sm:gap-3 max-sm:items-center">
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

          <Badge content={selected.length} color="danger">
            <Button
              isDisabled={selected.length < 2 || isPending}
              onClick={onClick.compare}
              className={`text-lg ${
                theme.dark
                  ? "text-foreground-700"
                  : "text-gray-100 bg-[#1B9C85]"
              }`}
              variant={theme.dark ? "shadow" : "solid"}
              color="default"
              about="compare-product-btn"
            >
              {isObject(textBtn) && textBtn.compare}
            </Button>
          </Badge>
        </div>
      )}

      <br />
      <section
        about="render-product-details"
        className="gap-6 max-md:gap-4 min-w-[80%] max-md:max-h-[55%] justify-center max-sm:min-w-[95%] grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:overflow-y-auto max-sm:grid-cols-1 max-sm:space-y-3 max-sm:p-1 max-sm:max-h-full"
      >
        {shouldRenderCardMobileSize &&
          products.map((product) => (
            <CardProductMobileSize
              onRemove={onRemove}
              onUpdate={onUpdate}
              key={product.id}
              {...product}
              selected={selected}
              onSelectedIdChange={toggleSelectedId}
            />
          ))}

        {shouldRenderCardPcOrTabletSize &&
          products.map((product) => (
            <CardProduct
              {...product}
              key={product.id}
              onRemove={onRemove}
              onUpdate={onUpdate}
              selected={selected}
              onSelectedIdChange={toggleSelectedId}
            />
          ))}
      </section>
    </section>
  );
};

export default Banner;
