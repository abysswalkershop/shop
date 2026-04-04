import { Metadata } from "next"
import { notFound } from "next/navigation"

import { sdk } from "@lib/config"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"

const PRODUCT_STATIC_PARAMS_PAGE_SIZE = 100

async function listProductHandles() {
  const handles = new Set<string>()
  let offset = 0

  while (true) {
    const { products } = await sdk.client.fetch<{
      products: Pick<NonNullable<Awaited<ReturnType<typeof listProducts>>["response"]["products"][number]>, "handle">[]
    }>("/store/products", {
      method: "GET",
      query: {
        limit: PRODUCT_STATIC_PARAMS_PAGE_SIZE,
        offset,
        fields: "handle",
      },
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    })

    if (!products.length) {
      break
    }

    products.forEach((product) => {
      if (product.handle) {
        handles.add(product.handle)
      }
    })

    if (products.length < PRODUCT_STATIC_PARAMS_PAGE_SIZE) {
      break
    }

    offset += PRODUCT_STATIC_PARAMS_PAGE_SIZE
  }

  return Array.from(handles)
}

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

export async function generateStaticParams() {
  try {
    const [regions, handles] = await Promise.all([listRegions(), listProductHandles()])

    const countryCodes = Array.from(
      new Set(
        regions.flatMap((region) =>
          region.countries?.map((country) => country.iso_2?.toLowerCase() ?? "") ?? []
        )
      )
    ).filter(Boolean)

    if (!countryCodes.length || !handles.length) {
      return []
    }

    return countryCodes.flatMap((countryCode) =>
      handles.map((handle) => ({
        countryCode,
        handle,
      }))
    )
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Abyss Walker`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Abyss Walker`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    notFound()
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
    />
  )
}
