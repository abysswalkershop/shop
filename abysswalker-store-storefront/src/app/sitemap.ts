import { MetadataRoute } from 'next'
import { sdk } from '@lib/config'
import { HttpTypes } from '@medusajs/types'

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL

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

// Routes to exclude from sitemap
const excludedPaths = ['/checkout', '/account', '/order']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        // Get available regions/countries
        const regions = await getRegions()
        const countryCodes = getCountryCodesFromRegions(regions)

        if (countryCodes.length === 0) {
            // Fallback to default country code if no regions found
            countryCodes.push('us')
        }

        return await generateSitemapWithAlternates(countryCodes)
    } catch (error) {
        console.error('Error generating sitemap:', error)
        // Fallback to default sitemap with US only
        return generateSitemapWithAlternates(['us'])
    }
}

async function getRegions(): Promise<HttpTypes.StoreRegion[]> {
    try {
        const response = await sdk.store.region.list()
        return response.regions || []
    } catch (error) {
        console.error('Error fetching regions:', error)
        return []
    }
}

function getCountryCodesFromRegions(regions: HttpTypes.StoreRegion[]): string[] {
    const countryCodes: string[] = []

    for (const region of regions) {
        if (region.countries && region.countries.length > 0) {
            for (const country of region.countries) {
                const countryCode = country.iso_2?.toLowerCase()
                if (countryCode && !countryCodes.includes(countryCode)) {
                    countryCodes.push(countryCode)
                }
            }
        }
    }

    return countryCodes
}

async function generateSitemapWithAlternates(countryCodes: string[]): Promise<MetadataRoute.Sitemap> {
    const sitemapEntries: MetadataRoute.Sitemap = []

    // Generate alternates for each country
    const generateAlternates = (route: string) => {
        const alternates: Record<string, string> = {}

        for (const countryCode of countryCodes) {
            alternates[countryCode] = `${SITE_URL}/${countryCode}${route}`
        }

        return { languages: alternates }
    }

    // Add static routes with alternates
    for (const route of staticRoutes) {
        sitemapEntries.push({
            url: `${SITE_URL}${route}`,
            lastModified: new Date(),
            changeFrequency: route === '' ? 'daily' : 'weekly',
            priority: route === '' ? 1 : 0.8,
            alternates: generateAlternates(route),
        })
    }

    try {
        // Get all products (using first country code for region lookup)
        const products = await getProducts(countryCodes[0])
        for (const product of products) {
            if (product.handle) {
                const route = `/products/${product.handle}`
                sitemapEntries.push({
                    url: `${SITE_URL}${route}`,
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
                    url: `${SITE_URL}${route}`,
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
                    url: `${SITE_URL}${route}`,
                    lastModified: new Date(collection.updated_at || new Date()),
                    changeFrequency: 'weekly',
                    priority: 0.7,
                    alternates: generateAlternates(route),
                })
            }
        }
    } catch (error) {
        console.error('Error generating dynamic routes:', error)
    }

    return sitemapEntries
}

async function getProducts(countryCode: string): Promise<HttpTypes.StoreProduct[]> {
    try {
        let allProducts: HttpTypes.StoreProduct[] = []
        let offset = 0
        const limit = 100

        while (true) {
            const response = await sdk.store.product.list({
                limit,
                offset,
                region_id: await getRegionIdByCountryCode(countryCode),
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
        console.error('Error fetching products:', error)
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
        console.error('Error fetching categories:', error)
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
        console.error('Error fetching collections:', error)
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
        console.error('Error getting region ID:', error)
        return undefined
    }
}
