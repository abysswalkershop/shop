import { getAllowed3DModelHosts } from '@lib/util/env'
import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_MODEL_EXTENSIONS = new Set(['.glb', '.gltf'])

const isAllowedProtocol = (url: URL) => {
    return url.protocol === 'https:' || url.hostname === 'localhost' || url.hostname === '127.0.0.1'
}

const isAllowedModelUrl = (url: URL) => {
    const hostname = url.hostname.toLowerCase()
    const pathname = url.pathname.toLowerCase()

    return (
        getAllowed3DModelHosts().has(hostname) &&
        isAllowedProtocol(url) &&
        Array.from(ALLOWED_MODEL_EXTENSIONS).some((extension) => pathname.endsWith(extension))
    )
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const urlParam = searchParams.get('url')

    if (!urlParam) {
        return new NextResponse('Missing url parameter', { status: 400 })
    }

    try {
        const modelUrl = new URL(urlParam)

        if (!isAllowedModelUrl(modelUrl)) {
            return new NextResponse('3D model host is not allowed', { status: 403 })
        }

        const response = await fetch(modelUrl, {
            headers: {
                'User-Agent': 'Medusa-Storefront/1.0',
            },
            next: {
                revalidate: 3600,
            },
            cache: 'force-cache',
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`)
        }

        const contentType = response.headers.get('content-type') || 'application/octet-stream'
        const arrayBuffer = await response.arrayBuffer()

        return new NextResponse(arrayBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        })
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Error proxying 3D model:', error)
        }

        return new NextResponse('Failed to load 3D model', { status: 500 })
    }
}
