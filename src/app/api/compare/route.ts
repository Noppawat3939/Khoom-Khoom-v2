import type { MapProductPricePerAmount, Product } from "@/types";
import {
  mapPricePerAmount,
  checkEqualProductValues,
  findMinPricePerAmount,
  findProductById,
  groupProductById,
  findProductCheapest,
} from "@/utils";
import { HttpStatusCode } from "axios";
import { isArray, isUndefined } from "lodash";
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

    const { cheapestPercent } = findProductCheapest(products);

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
      cheaperPercent: Math.floor(cheapestPercent),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: true },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
