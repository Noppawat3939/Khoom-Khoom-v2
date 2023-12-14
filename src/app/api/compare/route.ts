import { ZERO } from "@/constants";
import type { MapProductPricePerAmount, Product } from "@/types";
import {
  mapPricePerAmount,
  checkEqualProductValues,
  findMinPricePerAmount,
  findProductById,
  groupProductById,
  mapAmountPerPrice,
  calculateCheaperPercent,
} from "@/utils";
import { HttpStatusCode } from "axios";
import { isArray, isEmpty, isUndefined } from "lodash";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const products: Product[] = await req.json();

  if (!isArray(products))
    return NextResponse.json(
      { message: "Product value is invalid", error: true },
      { status: HttpStatusCode.BadRequest }
    );

  try {
    const isEqual = checkEqualProductValues(products);

    if (isEqual)
      return NextResponse.json({
        isEqual,
        data: products,
      });

    const pricePerAmountOfProduct = mapPricePerAmount(products);
    const amountPerPrice = mapAmountPerPrice(products);

    const cheaperPercent = !isEmpty(amountPerPrice)
      ? calculateCheaperPercent(amountPerPrice)
      : ZERO;

    const minAmountPerPrice = findMinPricePerAmount(
      pricePerAmountOfProduct as MapProductPricePerAmount
    );

    const groupedId = groupProductById(
      pricePerAmountOfProduct as MapProductPricePerAmount,
      minAmountPerPrice
    );

    const foundProduct = findProductById(products, groupedId);

    if (isUndefined(foundProduct))
      return NextResponse.json({
        data: null,
        isEqual,
      });

    return NextResponse.json({
      data: foundProduct,
      isEqual,
      cheaperPercent,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: true },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
