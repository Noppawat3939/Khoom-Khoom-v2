import { useAppTheme, useRenderContentCardProduct } from "@/hooks";
import { Product } from "@/types";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import React, { type FC } from "react";
import { FaRegEdit, FaShoppingCart } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

type CardProductMobileSizeProps = {
  onRemove: (removeId?: string) => void;
  onUpdate: (updateId?: string) => void;
  order: number;
} & Product;

const CardProductMobileSize: FC<CardProductMobileSizeProps> = ({
  onRemove,
  onUpdate,
  price,
  productName,
  size,
  order,
  id,
}) => {
  const {
    state: { theme },
  } = useAppTheme();
  const { content } = useRenderContentCardProduct({ size, price });

  return (
    <Card
      radius="sm"
      className="h-fit"
      isPressable
      onDoubleClick={() => onRemove(id)}
    >
      <CardBody className="pb-0">
        <div className="flex justify-between items-center">
          <span
            aria-label="product-name"
            className="flex items-center space-x-2"
          >
            <Badge
              content={order}
              className="text-white"
              variant="shadow"
              color={theme.light ? "success" : "danger"}
            >
              <FaShoppingCart className="w-6 h-6 text-foreground-400" />
            </Badge>
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
          className="text-foreground-500"
        >{`${content.size} - ${content.price}`}</Chip>
      </CardFooter>
    </Card>
  );
};

export default CardProductMobileSize;
