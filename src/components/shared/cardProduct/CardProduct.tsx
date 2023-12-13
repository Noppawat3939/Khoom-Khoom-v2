import React, { type FC } from "react";
import { useAppTheme, useRenderContentCardProduct } from "@/hooks";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoPricetagOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Chip } from "@nextui-org/react";
import Image from "next/image";

import productImage from "@/assets/png/product.png";
import type { CardProductProps } from "./card-product-type";

const CardProduct: FC<CardProductProps> = ({
  price,
  productName,
  size,
  onRemove,
  onUpdate,
  id,
}) => {
  const {
    state: { theme },
  } = useAppTheme();

  const { content } = useRenderContentCardProduct({ size, price });

  return (
    <Card
      shadow="sm"
      className="p-2 min-h-[220px] max-sm:min-h-[260px] z-0"
      onDoubleClick={() => onRemove?.(id)}
      isPressable
    >
      <CardBody className="p-0">
        <div className="position">
          <div className="w-full overflow-hidden bg-foreground-100 h-[180px] flex justify-center rounded-md items-center">
            <Image
              alt="default-product-image"
              loading="lazy"
              className="shadow-none border-none max-h-[180px] max-w-[80px] max-md:h-[140px] max-sm:h-[160px] duration-250 transition-all hover:scale-125"
              src={productImage}
            />
          </div>
          <Button
            isIconOnly
            onClick={() => onUpdate(id)}
            variant="ghost"
            size="sm"
            aria-label="update-product-btn"
            className="absolute rounded-lg top-1 right-1 z-10 shadow-sm"
          >
            <FaRegEdit className="w-6 h-6 p-1 text-foreground-400" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <CardHeader className="px-0 w-fit text-xl flex items-center max-md:text-lg">
            <span className="flex items-center" aria-label="product-name">
              <MdDriveFileRenameOutline
                className={`${
                  theme.dark
                    ? " bg-foreground-100 text-foreground-400"
                    : "bg-green-100 text-green-500"
                } w-6 h-6 mr-2 p-1 rounded-md`}
              />
              {productName}
            </span>
            <Chip size="sm" className="ml-1 text-foreground-500" variant="flat">
              {content.size}
            </Chip>
          </CardHeader>
          <Button
            onClick={() => onRemove?.(id)}
            size="sm"
            isIconOnly
            variant="light"
            color="danger"
          >
            <FaRegTrashCan className="w-4 h-4" />
          </Button>
        </div>
        <span className="flex items-center mt-auto space-x-1">
          <IoPricetagOutline
            className={`${
              theme.dark
                ? " bg-foreground-100 text-foreground-400"
                : "bg-green-100 text-green-500"
            } w-6 h-6 mr-2 p-1 rounded-md`}
          />
          <h2 aria-label="price" className="text-sm font-medium">
            {content.price}
          </h2>
        </span>
      </CardBody>
    </Card>
  );
};

export default CardProduct;
