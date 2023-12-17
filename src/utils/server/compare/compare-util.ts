import type {
  Product,
  ProductWithPricePerUnit,
  CleanedProducts,
} from "@/types";
import { isArray, uniq } from "lodash";
import { calPercentDiff } from "../shared";

/**
 *
 * @param products 
 * @example
 * cleanUpNumberValues([
    {
      id: "1",
      productName: "product_A",
      price: "50",
      size: "100",
      quantity: "2"
    }, ...]) => [
    {
      id: "1",
      productName: "product_A",
      price: 50,
      size: 100,
      quantity: 2
    },...]
 */
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

/**
 *
 * @param products 
 * @example
 * mapPricePerUnit([
    {
      id: "1",
      productName: "product_A",
      price: "50",
      size: "100",
      quantity: "2"
    }, ...]) => [
    {
      id: "1",
      productName: "product_A",
      price: 50,
      size: 100,
      quantity: 2
      pricePerUnit: 25
    },...]
 */
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

/**
 *
 * @param products 
 * @example
 * checkEqualProductValues([
     {
        id: "1",
        productName: "product_A",
        price: "50",
        size: "100",
        quantity: "2"
      },
     {
        id: "2",
        productName: "product_A",
        price: "140",
        size: "80",
        quantity: "2"
      },
   ]) => false
 */
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

/**
 *
 * @param productWithPricePerUnit 
 * @example
 * getMinPricePerUnitProduct([
    {
      id: "1",
      productName: "product_A",
      price: 50,
      size: 100,
      quantity: 2
      pricePerUnit: 25
    },
    {
      id: "2",
      productName: "product_A",
      price: 50,
      size: 100,
      quantity: 2
      pricePerUnit: 50
    },
    ]) => 25
 */
const getMinPricePerUnitProduct = (
  productWithPricePerUnit: ProductWithPricePerUnit[]
) =>
  Math.min(...productWithPricePerUnit.map((product) => product.pricePerUnit));

/**
 *
 * @param productWithPricePerUnit 
 * @example
 * getMaxPricePerUnitProduct([
    {
      id: "1",
      productName: "product_A",
      price: 50,
      size: 100,
      quantity: 2
      pricePerUnit: 25
    },
    {
      id: "2",
      productName: "product_A",
      price: 50,
      size: 100,
      quantity: 2
      pricePerUnit: 50
    },
    ]) => 50
 */
const getMaxPricePerUnitProduct = (
  productWithPricePerUnit: ProductWithPricePerUnit[]
) =>
  Math.max(...productWithPricePerUnit.map((product) => product.pricePerUnit));

/**
 *
 * @param products 
 * @example
 * findProductCheapest([
    {
      id: "1",
      productName: "product_A",
      price: "10",
      size: "10",
      quantity: "2"
    },
    {
      id: "2",
      productName: "product_B",
      price: "10",
      size: "10",
      quantity: "1"
    },
    ]) => {cheapestPercent: 100, cheapestProductId: ["1"]}
 */
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
