import type {
  Product,
  ProductWithPricePerUnit,
  CleanedProducts,
} from "@/types";
import { isArray, uniq } from "lodash";
import { calPercentDiff } from "../shared";

const cleanUpNumberValues = (products: Product[]) => {
  const minQuantity = 1;

  const cleaned: CleanedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
    size: Number(product.size),
    quantity: Number(product.quantity) || minQuantity,
  }));

  return cleaned;
};

const mapPricePerUnit = (products: Product[]) => {
  const cleanedProducts = cleanUpNumberValues(products);

  const productsPricePerUnit: ProductWithPricePerUnit[] = cleanedProducts.map(
    (product) => {
      const pricePerUnit = product.price / (product.size * product.quantity);

      return { ...product, pricePerUnit: +pricePerUnit.toFixed(3) };
    }
  );

  return productsPricePerUnit;
};

export const checkEqualProductValues = (products: Product[]) => {
  const hasOneValue = 1;

  const productsPricePerUnit = mapPricePerUnit(products).map(
    (product) => product.pricePerUnit
  );
  const isEqualValue = uniq(productsPricePerUnit).length === hasOneValue;

  return isEqualValue;
};

export const findProductById = (
  products: Product[],
  findId: string | string[]
) =>
  isArray(findId)
    ? products.filter((product) => findId.includes(product.id))
    : products.find((product) => product.id === findId);

const getMinPricePerUnitProduct = (
  productWithPricePerUnit: ProductWithPricePerUnit[]
) =>
  Math.min(...productWithPricePerUnit.map((product) => product.pricePerUnit));

const getMaxPricePerUnitProduct = (
  productWithPricePerUnit: ProductWithPricePerUnit[]
) =>
  Math.max(...productWithPricePerUnit.map((product) => product.pricePerUnit));

export const findProductCheapest = (products: Product[]) => {
  const minPricePerUnit = getMinPricePerUnitProduct(mapPricePerUnit(products));
  const maxPricePerUnit = getMaxPricePerUnitProduct(mapPricePerUnit(products));

  const minProducts = mapPricePerUnit(products).filter(
    (product) => product.pricePerUnit === minPricePerUnit
  );

  const cheapestPercentage = calPercentDiff(maxPricePerUnit, minPricePerUnit);

  return {
    cheapestPercent: cheapestPercentage,
    cheapestProductId: minProducts.map((prd) => prd.id),
  };
};
