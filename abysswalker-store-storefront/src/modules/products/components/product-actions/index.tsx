"use client"

import { addToCart } from "@lib/data/cart"
import { useCountryCode } from "@lib/context/country-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import isEqual from "lodash/isEqual"
import { useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"

type ProductActionsProps = {
  countryCode?: string
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce<Record<string, string>>((acc, variantOption) => {
    if (variantOption.option_id && variantOption.value) {
      acc[variantOption.option_id] = variantOption.value
    }

    return acc
  }, {})
}

const getInitialOptions = (product: HttpTypes.StoreProduct) => {
  if (!product.variants?.length) {
    return {}
  }

  const firstInStockVariant = product.variants.find((variant) =>
    isVariantInStock(variant)
  )

  if (firstInStockVariant) {
    return optionsAsKeymap(firstInStockVariant.options) ?? {}
  }

  if (product.variants.length === 1) {
    return optionsAsKeymap(product.variants[0].options) ?? {}
  }

  return {}
}

// Helper function to check if a variant is in stock
const isVariantInStock = (variant: HttpTypes.StoreProductVariant) => {
  // If we don't manage inventory, it's always in stock
  if (!variant.manage_inventory) {
    return true
  }

  // If we allow back orders, it's always in stock
  if (variant.allow_backorder) {
    return true
  }

  // If there is inventory available, it's in stock
  if (variant.manage_inventory && (variant.inventory_quantity || 0) > 0) {
    return true
  }

  return false
}

export default function ProductActions({
  countryCode: providedCountryCode,
  product,
  disabled,
}: ProductActionsProps) {
  if (providedCountryCode) {
    return (
      <ProductActionsContent
        countryCode={providedCountryCode}
        product={product}
        disabled={disabled}
      />
    )
  }

  return <ProductActionsWithResolvedCountry product={product} disabled={disabled} />
}

function ProductActionsWithResolvedCountry({
  product,
  disabled,
}: Omit<ProductActionsProps, "countryCode" | "region">) {
  const countryCode = useCountryCode()

  return (
    <ProductActionsContent
      countryCode={countryCode}
      product={product}
      disabled={disabled}
    />
  )
}

function ProductActionsContent({
  countryCode,
  product,
  disabled,
}: {
  countryCode: string
  product: HttpTypes.StoreProduct
  disabled?: boolean
}) {
  const [options, setOptions] = useState<Record<string, string | undefined>>(() =>
    getInitialOptions(product)
  )
  const [isAdding, setIsAdding] = useState(false)

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    if (!selectedVariant) return false
    return isVariantInStock(selectedVariant)
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant && !options
            ? "Select variant"
            : !inStock || !isValidVariant
              ? "Out of stock"
              : "Add to cart"}
        </Button>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}