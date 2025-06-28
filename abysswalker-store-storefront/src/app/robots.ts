import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                disallow: ['/checkout', '/account/*'],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    }
}
