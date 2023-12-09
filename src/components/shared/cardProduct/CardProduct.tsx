import { Product } from "@/types";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React, { type FC } from "react";

type CardProductProps = { image: string } & Product;

const CardProduct: FC<CardProductProps> = ({
  image,
  price,
  productName,
  size,
}) => {
  return (
    <Card shadow="sm" className="p-2 min-h-[200px]" isPressable>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="sm"
          width="100%"
          alt="default-product-image"
          loading="lazy"
          className="w-full object-cover h-[140px] max-md:h-[110px]"
          src={image}
        />
        <CardHeader className="p-0 text-2xl flex items-baseline max-md:text-xl">
          {productName}
          <span
            aria-label="size-product"
            className="text-foreground-400 text-lg max-sm:text-sm ml-1"
          >{`(size ${size})`}</span>
        </CardHeader>
        <span className="flex items-baseline mt-auto space-x-1">
          <h2 aria-label="price-label" className="text-lg font-medium">
            Price
          </h2>
          <h2
            aria-label="price-product"
            className="text-md font-medium text-foreground-700"
          >{`${price} Baht`}</h2>
        </span>
      </CardBody>
    </Card>
  );
};

export default CardProduct;
