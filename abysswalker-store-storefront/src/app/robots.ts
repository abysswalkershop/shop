import { MetadataRoute } from 'next'

import { getSiteUrl } from '@lib/util/env'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                disallow: ['/checkout', '/account/*'],
            },
        ],
        sitemap: getSiteUrl('/sitemap.xml'),
    }
}
