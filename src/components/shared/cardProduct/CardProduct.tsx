import { useAppTheme, useGetContentByLocale } from "@/hooks";
import { useLocaleStore } from "@/stores";
import { Product } from "@/types";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React, { type FC } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoPricetagOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

type CardProductProps = {
  image: string;
  onRemove: (removeId?: string) => void;
} & Product;

const CardProduct: FC<CardProductProps> = ({
  image,
  price,
  productName,
  size,
  onRemove,
  id,
}) => {
  const {
    state: {
      times: { isNight },
    },
  } = useAppTheme();

  const { locale } = useLocaleStore((store) => ({ locale: store.locale }));
  const { data: content } = useGetContentByLocale(locale);

  return (
    <Card
      shadow="sm"
      className="p-2 min-h-[200px] z-0"
      onDoubleClick={() => onRemove?.(id)}
      isPressable
    >
      <CardBody className="overflow-visible p-0">
        <div className="position w-fit h-fit ">
          <Image
            shadow="sm"
            radius="sm"
            width="100%"
            alt="default-product-image"
            loading="lazy"
            className="w-full shadow-none border-none object-cover h-[180px] max-md:h-[140px] max-sm:h-[180px]"
            src={image}
          />
          <Button
            isIconOnly
            variant="faded"
            aria-label="edit-product-btn"
            className="absolute rounded-lg top-1 right-1 z-10 shadow-sm"
          >
            <FaRegEdit className="w-7 h-7 p-1 text-foreground-500" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <CardHeader className="px-0 w-fit text-2xl flex items-center max-md:text-xl">
            <span className="flex items-center">
              <MdDriveFileRenameOutline
                className={`${
                  isNight
                    ? " bg-foreground-100 text-foreground-400"
                    : "bg-green-100 text-green-500"
                } w-6 h-6 mr-2 p-1 rounded-md`}
              />
              {productName}
            </span>
            <span
              aria-label="size-product"
              className="text-foreground-400 text-[16px] ml-1"
            >
              {content?.product_details.size_label.replaceAll("{{}}", size)}
            </span>
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
              isNight
                ? " bg-foreground-100 text-foreground-400"
                : "bg-green-100 text-green-500"
            } w-6 h-6 mr-2 p-1 rounded-md`}
          />
          <h2 aria-label="price" className="text-lg font-medium">
            {content?.product_details.price_label.replaceAll("{{}}", price)}
          </h2>
        </span>
      </CardBody>
    </Card>
  );
};

export default CardProduct;
