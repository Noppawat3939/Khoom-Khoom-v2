import type { Product } from "@/types";
import {
  checkEqualProductValues,
  findProductById,
  findProductCheapest,
  toUpperCase,
} from "@/utils";
import { HttpStatusCode } from "axios";
import { isArray, isUndefined } from "lodash";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const products: Product[] = await req.json();

  if (!isArray(products))
    return NextResponse.json(
      { message: toUpperCase("Product value is invalid"), error: true },
      { status: HttpStatusCode.BadRequest }
    );

  try {
    const isEqual = checkEqualProductValues(products);

    if (isEqual)
      return NextResponse.json({
        isEqual,
        data: products,
      });

    const { cheapestPercent, cheapestProductId } =
      findProductCheapest(products);

    const foundProduct = findProductById(products, cheapestProductId);

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
      { message: toUpperCase("Something went wrong"), error: true },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
