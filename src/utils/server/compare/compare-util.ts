import { FIRST_INDEX, ZERO } from "@/constants";
import type { MapProductPricePerAmount, Product } from "@/types";
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

export const findMinPricePerAmount = (
  mapProducts: MapProductPricePerAmount
) => {
  return Math.min(...mapProducts.map((product) => product.pricePerAmount));
};

export const groupProductById = (
  mapProducts: MapProductPricePerAmount,
  minPrice: number
) => {
  const result = groupBy(mapProducts, "pricePerAmount")[minPrice].flatMap(
    (item) => item.id ?? "0"
  );

  return result;
};

export const findProductById = (
  products: Product[],
  findId: string | string[]
) =>
  isArray(findId)
    ? products.filter((product) => findId.includes(product.id))
    : products.find((product) => product.id === findId);
