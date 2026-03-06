import { HttpTypes } from "@medusajs/types"
import { getPercentageDiff } from "./get-precentage-diff"
import { convertToLocale } from "./money"

type ProductVariant = NonNullable<HttpTypes.StoreProduct["variants"]>[number]

export const getPricesForVariant = (variant: ProductVariant) => {
  const calculatedPrice = variant.calculated_price

  if (
    !calculatedPrice?.calculated_amount ||
    !calculatedPrice.currency_code ||
    calculatedPrice.original_amount == null
  ) {
    return null
  }

  return {
    calculated_price_number: calculatedPrice.calculated_amount,
    calculated_price: convertToLocale({
      amount: calculatedPrice.calculated_amount,
      currency_code: calculatedPrice.currency_code,
    }),
    original_price_number: calculatedPrice.original_amount,
    original_price: convertToLocale({
      amount: calculatedPrice.original_amount,
      currency_code: calculatedPrice.currency_code,
    }),
    currency_code: calculatedPrice.currency_code,
    price_type: calculatedPrice.calculated_price?.price_list_type ?? "default",
    percentage_diff: getPercentageDiff(
      calculatedPrice.original_amount,
      calculatedPrice.calculated_amount
    ),
  }
}

export function getProductPrice({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct
  variantId?: string
}) {
  if (!product || !product.id) {
    throw new Error("No product provided")
  }

  const cheapestPrice = () => {
    if (!product || !product.variants?.length) {
      return null
    }

    const cheapestVariant = product.variants
      .filter((variant): variant is ProductVariant => {
        return variant.calculated_price?.calculated_amount != null
      })
      .sort((a, b) => {
        return (
          (a.calculated_price?.calculated_amount ?? 0) -
          (b.calculated_price?.calculated_amount ?? 0)
        )
      })[0]

    return getPricesForVariant(cheapestVariant)
  }

  const variantPrice = () => {
    if (!product || !variantId) {
      return null
    }

    const variant = product.variants?.find(
      (v) => v.id === variantId || v.sku === variantId
    )

    if (!variant) {
      return null
    }

    return getPricesForVariant(variant)
  }

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  }
}
