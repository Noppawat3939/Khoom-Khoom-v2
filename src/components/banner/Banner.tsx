import { useAppTheme } from "@/hooks";
import React, { useMemo, type FC, useCallback } from "react";
import { Button } from "..";
import { useProductsStore } from "@/stores";
import { isEmpty } from "lodash";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

type BannerProps = {
  title: string;
  description: string;
  textBtn: string;
  onClick?: <T>(arg?: T) => void;
};

const Banner: FC<BannerProps> = ({ title, description, textBtn, onClick }) => {
  const {
    state: { times },
  } = useAppTheme();

  const { products } = useProductsStore((store) => ({
    products: store.products,
  }));

  const renderProductImage = () => {
    if (times.isMorning)
      return "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    if (times.isAfternoon)
      return "https://images.unsplash.com/photo-1422207049116-cfaf69531072?q=80&w=2035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return "https://images.unsplash.com/photo-1494698853255-d0fa521abc6c?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  };

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

      {products.length <= 2 ? (
        <Button
          onClick={onClick}
          className={`mt-5 text-lg ${
            times.isNight ? "text-foreground-100" : "text-gray-400"
          }`}
          variant="bordered"
          about="create-product-btn"
        >
          {textBtn}
        </Button>
      ) : (
        <Button
          className={`mt-5 text-lg ${
            times.isNight ? "text-foreground-700" : "text-gray-400"
          }`}
          variant="solid"
          about="create-product-btn"
        >
          {textBtn}
        </Button>
      )}

      <br />
      <section className="gap-6 max-md:gap-4 min-w-[80%] max-md:overflow-y-auto max-md:max-h-[50%] justify-center max-sm:min-w-[95%] grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1">
        {!isEmpty(products) &&
          products.map((product) => (
            <Card shadow="sm" className="p-2 min-h-[200px]" key={product.id}>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="sm"
                  width="100%"
                  alt="default-product-image"
                  loading="lazy"
                  className="w-full object-cover h-[140px] max-md:h-[110px]"
                  src={renderProductImage()}
                />
                <CardHeader className="p-0 text-2xl flex items-baseline max-md:text-xl">
                  {product.productName}
                  <span className="text-foreground-400 text-lg max-sm:text-sm ml-1">{`(size ${product.size})`}</span>
                </CardHeader>
                <span className="flex items-baseline mt-auto space-x-1">
                  <h2 aria-label="price-label" className="text-lg font-medium">
                    Price
                  </h2>
                  <h2 className="text-md font-medium text-foreground-700">{`${product.price} Baht`}</h2>
                </span>
              </CardBody>
            </Card>
          ))}
      </section>
    </section>
  );
};

export default Banner;
