import { EMPTY_STRING, FIRST_INDEX, ZERO } from "@/constants";
import type { MapProductPricePerAmount, Product } from "@/types";
import { groupBy, isArray, uniq } from "lodash";

const cleanUpNumberValues = (products: Product[]) => {
  const minQuantity = 1;

  const cleaned = products.map((product) => ({
    ...product,
    price: Number(product.price),
    size: Number(product.size),
    quantity: Number(product.quantity) || minQuantity,
  }));

  return cleaned;
};

const mapPricePerUnit = (products: Product[]) => {
  const cleanedProducts = cleanUpNumberValues(products);

  const productsPricePerUnit = cleanedProducts.map((product) => {
    const pricePerUnit = product.price / (product.size * product.quantity);

    return pricePerUnit;
  });

  return productsPricePerUnit;
};

export const checkEqualProductValues = (products: Product[]) => {
  const hasOneValue = 1;

  const productsPricePerUnit = mapPricePerUnit(products);
  const isEqualValue = uniq(productsPricePerUnit).length === hasOneValue;

  return isEqualValue;
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

export const findProductById = (
  products: Product[],
  findId: string | string[]
) =>
  isArray(findId)
    ? products.filter((product) => findId.includes(product.id))
    : products.find((product) => product.id === findId);

export const findProductCheapest = (products: Product[]) => {
  const parsedProducts = cleanUpNumberValues(products);

  let cheapestPercent = ZERO;
  let cheapestProduct = null;
  let cheapestProductId = EMPTY_STRING;

  parsedProducts.forEach((product) => {
    const pricePerUnit = product.price / (product.size * product.quantity);

    const percentDifference =
      (Math.abs(
        pricePerUnit -
          parsedProducts[FIRST_INDEX].price / parsedProducts[FIRST_INDEX].size
      ) /
        (parsedProducts[FIRST_INDEX].price /
          parsedProducts[FIRST_INDEX].size)) *
      100;

    if (cheapestPercent === ZERO || percentDifference < cheapestPercent) {
      cheapestPercent = percentDifference;
      cheapestProduct = product.productName;
      cheapestProductId = product.id;
    }
  });

  return { cheapestPercent, cheapestProduct, cheapestProductId };
};
