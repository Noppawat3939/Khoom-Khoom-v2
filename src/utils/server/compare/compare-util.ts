import { FIRST_INDEX, ZERO } from "@/constants";
import type {
  MapProductAmountPerPrice,
  MapProductPricePerAmount,
  Product,
} from "@/types";
import { groupBy, isArray } from "lodash";

export const checkEqualProductValues = (products: Product[]) => {
  //used first index to target for check every elements
  const firstProductIdx = products.at(FIRST_INDEX);
  const targetPricePerSize = firstProductIdx
    ? +firstProductIdx?.price / +firstProductIdx?.size
    : ZERO;

  const isEqual = products.every(
    (product) => +product.price / +product.size === targetPricePerSize
  );

  return isEqual;
};

export const mapPricePerAmount = (products: Product[]) => {
  const result = products.map((product) => {
    const priceNum = Number(product.price);
    const amountNum = Number(product.size);

    if (!isNaN(priceNum) && !isNaN(amountNum) && amountNum !== 0) {
      return {
        pricePerAmount: Number((priceNum / amountNum).toFixed(3)),
        id: product.id,
      };
    }
  });

  return result;
};

export const mapAmountPerPrice = (products: Product[]) => {
  const result = products.map((product) => {
    const priceNum = Number(product.price);
    const amountNum = Number(product.size);

    if (!isNaN(priceNum) && !isNaN(amountNum) && amountNum !== 0) {
      return {
        amountPerPrice: Number((amountNum / priceNum).toFixed(3)),
      };
    }

    return { amountPerPrice: 0 };
  });

  return result;
};

export const findMinPricePerAmount = (
  mapProducts: MapProductPricePerAmount
) => {
  return Math.min(...mapProducts.map((product) => product.pricePerAmount));
};

export const groupProductById = (
  pricePerAmountProducts: MapProductPricePerAmount,
  minPrice: number
) => {
  const result = groupBy(pricePerAmountProducts, "pricePerAmount")[
    minPrice
  ].flatMap((item) => item.id ?? "0");

  return result;
};

export const findProductById = (
  products: Product[],
  findId: string | string[]
) =>
  isArray(findId)
    ? products.filter((product) => findId.includes(product.id))
    : products.find((product) => product.id === findId);

export const calculateMinimumAmountPerPrice = (
  amountPerPriceProducts: MapProductAmountPerPrice
) => {
  return amountPerPriceProducts.reduce((minProduct, curProduct) => {
    if (curProduct.amountPerPrice < minProduct.amountPerPrice) {
      return minProduct;
    } else {
      return curProduct;
    }
  });
};

export const calculateMaximumAmountPerPrice = (
  amountPerPriceProducts: MapProductAmountPerPrice
) => {
  return amountPerPriceProducts.reduce((minProduct, curProduct) => {
    if (curProduct.amountPerPrice > minProduct.amountPerPrice) {
      return minProduct;
    } else {
      return curProduct;
    }
  });
};

export const calculateCheaperPercent = (
  amountPerPriceProducts: MapProductAmountPerPrice
) => {
  //@ts-ignore
  const percent = amountPerPriceProducts.reduce((acc, cur) => {
    if (cur.amountPerPrice > acc.amountPerPrice) {
      return Math.floor(
        ((cur.amountPerPrice - acc.amountPerPrice) / cur.amountPerPrice) * 100
      );
    }

    if (cur.amountPerPrice < acc.amountPerPrice) {
      return Math.floor(
        ((acc.amountPerPrice - cur.amountPerPrice) / acc.amountPerPrice) * 100
      );
    }

    const minAmountPerPrice = calculateMinimumAmountPerPrice(
      amountPerPriceProducts
    );
    const maxAmountPerPrice = calculateMaximumAmountPerPrice(
      amountPerPriceProducts
    );

    if (minAmountPerPrice.amountPerPrice > maxAmountPerPrice.amountPerPrice) {
      return Math.floor(
        ((minAmountPerPrice.amountPerPrice - maxAmountPerPrice.amountPerPrice) /
          minAmountPerPrice.amountPerPrice) *
          100
      );
    }

    return 0;
  });

  return percent as unknown as number;
};
