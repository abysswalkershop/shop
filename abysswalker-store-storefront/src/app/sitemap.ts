import { MetadataRoute } from 'next'
import { sdk } from '@lib/config'
import { getLocalizedUrl } from '@lib/util/env'
import { HttpTypes } from '@medusajs/types'
import { cache } from 'react'

const isPrerenderCancellationError = (error: unknown) => {
    if (!(error instanceof Error)) {
        return false
    }

    return (
        'digest' in error &&
        error.digest === 'HANGING_PROMISE_REJECTION'
    ) || error.message.includes('During prerendering, fetch() rejects when the prerender is complete.')
}

const logSitemapError = (message: string, error: unknown) => {
    if (isPrerenderCancellationError(error)) {
        return
    }

    console.error(message, error)
}

// Static routes that are always available
const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/store',
    '/categories',
    '/collections',
    '/cart',
    '/privacy-policy',
    '/imprint',
    '/returns',
    '/termsofsale',
    '/tos',
    '/tou'
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const regions = await getRegions()
        const countryCodes = getCountryCodesFromRegions(regions)
        const defaultCountryCode = getDefaultCountryCode(countryCodes)

        if (countryCodes.length === 0) {
            countryCodes.push(defaultCountryCode)
        }

        return await generateSitemapWithAlternates(countryCodes, defaultCountryCode)
    } catch (error) {
        logSitemapError('Error generating sitemap:', error)

        const defaultCountryCode = getDefaultCountryCode([])
        return generateSitemapWithAlternates([defaultCountryCode], defaultCountryCode)
    }
}

function getDefaultCountryCode(countryCodes: string[]) {
    const configuredCountryCode = process.env.NEXT_PUBLIC_DEFAULT_REGION?.toLowerCase()

    if (configuredCountryCode && countryCodes.includes(configuredCountryCode)) {
        return configuredCountryCode
    }

    return configuredCountryCode || countryCodes[0] || 'us'
}

const getRegions = cache(async (): Promise<HttpTypes.StoreRegion[]> => {
    try {
        const response = await sdk.store.region.list()
        return response.regions || []
    } catch (error) {
        logSitemapError('Error fetching regions:', error)
        return []
    }
})

function getCountryCodesFromRegions(regions: HttpTypes.StoreRegion[]): string[] {
    const countryCodes = new Set<string>()

    for (const region of regions) {
        if (region.countries && region.countries.length > 0) {
            for (const country of region.countries) {
                const countryCode = country.iso_2?.toLowerCase()
                if (countryCode) {
                    countryCodes.add(countryCode)
                }
            }
        }
    }

    return Array.from(countryCodes)
}

async function generateSitemapWithAlternates(
    countryCodes: string[],
    defaultCountryCode: string
): Promise<MetadataRoute.Sitemap> {
    const sitemapEntries: MetadataRoute.Sitemap = []

    const generateAlternates = (route: string) => {
        const alternates: Record<string, string> = {}

        for (const countryCode of countryCodes) {
            alternates[countryCode] = getLocalizedUrl(countryCode, route)
        }

        alternates['x-default'] = getLocalizedUrl(defaultCountryCode, route)

        return { languages: alternates }
    }

    for (const route of staticRoutes) {
        sitemapEntries.push({
            url: getLocalizedUrl(defaultCountryCode, route),
            lastModified: new Date(),
            changeFrequency: route === '' ? 'daily' : 'weekly',
            priority: route === '' ? 1 : 0.8,
            alternates: generateAlternates(route),
        })
    }

    try {
        const products = await getProducts(defaultCountryCode)
        for (const product of products) {
            if (product.handle) {
                const route = `/products/${product.handle}`
                sitemapEntries.push({
                    url: getLocalizedUrl(defaultCountryCode, route),
                    lastModified: new Date(product.updated_at || new Date()),
                    changeFrequency: 'weekly',
                    priority: 0.6,
                    alternates: generateAlternates(route),
                })
            }
        }

        // Add category routes with alternates
        const categories = await getCategories()
        for (const category of categories) {
            if (category.handle) {
                const route = `/categories/${category.handle}`
                sitemapEntries.push({
                    url: getLocalizedUrl(defaultCountryCode, route),
                    lastModified: new Date(category.updated_at || new Date()),
                    changeFrequency: 'weekly',
                    priority: 0.7,
                    alternates: generateAlternates(route),
                })
            }
        }

        // Add collection routes with alternates
        const collections = await getCollections()
        for (const collection of collections) {
            if (collection.handle) {
                const route = `/collections/${collection.handle}`
                sitemapEntries.push({
                    url: getLocalizedUrl(defaultCountryCode, route),
                    lastModified: new Date(collection.updated_at || new Date()),
                    changeFrequency: 'weekly',
                    priority: 0.7,
                    alternates: generateAlternates(route),
                })
            }
        }
    } catch (error) {
        logSitemapError('Error generating dynamic routes:', error)
    }

    return sitemapEntries
}

async function getProducts(countryCode: string): Promise<HttpTypes.StoreProduct[]> {
    try {
        let allProducts: HttpTypes.StoreProduct[] = []
        let offset = 0
        const limit = 100
        const regionId = await getRegionIdByCountryCode(countryCode)

        while (true) {
            const response = await sdk.store.product.list({
                limit,
                offset,
                ...(regionId ? { region_id: regionId } : {}),
            })

            if (!response.products || response.products.length === 0) {
                break
            }

            allProducts = allProducts.concat(response.products)

            if (response.products.length < limit) {
                break
            }

            offset += limit
        }

        return allProducts
    } catch (error) {
        logSitemapError('Error fetching products:', error)
        return []
    }
}

async function getCategories(): Promise<HttpTypes.StoreProductCategory[]> {
    try {
        const response = await sdk.store.category.list({
            limit: 1000,
        })
        return response.product_categories || []
    } catch (error) {
        logSitemapError('Error fetching categories:', error)
        return []
    }
}

async function getCollections(): Promise<HttpTypes.StoreCollection[]> {
    try {
        const response = await sdk.store.collection.list({
            limit: 1000,
        })
        return response.collections || []
    } catch (error) {
        logSitemapError('Error fetching collections:', error)
        return []
    }
}

async function getRegionIdByCountryCode(countryCode: string): Promise<string | undefined> {
    try {
        const regions = await getRegions()

        for (const region of regions) {
            if (region.countries) {
                const country = region.countries.find(
                    (c) => c.iso_2?.toLowerCase() === countryCode.toLowerCase()
                )
                if (country) {
                    return region.id
                }
            }
        }

        return undefined
    } catch (error) {
        logSitemapError('Error getting region ID:', error)
        return undefined
    }
}
