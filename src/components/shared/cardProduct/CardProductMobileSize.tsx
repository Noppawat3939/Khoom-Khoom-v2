import React, { type FC } from "react";
import { useAppTheme, useRenderContentCardProduct } from "@/hooks";
import { Button, Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import type { CardProductMobileSizeProps } from "./card-product-type";
import { BsFillBoxFill } from "react-icons/bs";

const CardProductMobileSize: FC<CardProductMobileSizeProps> = ({
  onRemove,
  onUpdate,
  price,
  productName,
  size,
  id,
  selected,
  onSelectedIdChange,
}) => {
  const {
    state: { theme },
  } = useAppTheme();

  const { content } = useRenderContentCardProduct({ size, price });

  const isSelected = selected.includes(id);

  return (
    <Card
      className={`${
        isSelected && theme.dark
          ? "ring-[#F5A524]"
          : isSelected && theme.light
          ? "ring-green-300"
          : "ring-transparent"
      } h-fit rounded-xl ring-[2px]`}
      isPressable
      onDoubleClick={() => onRemove(id)}
      onClick={() => onSelectedIdChange?.(id)}
    >
      <CardBody className="pb-0">
        <div className="flex justify-between items-center">
          <span
            aria-label="product-name"
            className="flex items-center space-x-2"
          >
            <BsFillBoxFill
              className={`${
                isSelected && theme.dark
                  ? " text-[#F5A524]"
                  : isSelected && theme.light
                  ? "text-green-400"
                  : "text-foreground-300"
              } ${isSelected ? "drop-shadow-md" : "drop-shadow-none"} w-6 h-6 `}
            />
            <span className="text-xl">{productName}</span>
          </span>
          <span className="flex space-x-2">
            <Button
              isIconOnly
              size="sm"
              onClick={() => onUpdate(id)}
              variant="light"
              aria-label="update-product-btn"
            >
              <FaRegEdit className="w-5 h-5 text-foreground-400" />
            </Button>
            <Button
              onClick={() => onRemove(id)}
              size="sm"
              isIconOnly
              variant="light"
              color="danger"
            >
              <FaRegTrashCan className="w-5 h-5" />
            </Button>
          </span>
        </div>
      </CardBody>
      <CardFooter className="pt-1 text-sm">
        <Chip
          size="sm"
          variant="flat"
          color={isSelected && theme.dark ? "warning" : "default"}
          className="text-foreground-500"
        >{`${content.size} - ${content.price}`}</Chip>
      </CardFooter>
    </Card>
  );
};

export default CardProductMobileSize;
