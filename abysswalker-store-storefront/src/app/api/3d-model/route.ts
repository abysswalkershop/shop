import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
        return new NextResponse('Missing url parameter', { status: 400 })
    }

    try {
        // Validate that it's a valid URL
        new URL(url)

        // Fetch the 3D model from the external URL
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Medusa-Storefront/1.0',
            },
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`)
        }

        const contentType = response.headers.get('content-type') || 'application/octet-stream'
        const arrayBuffer = await response.arrayBuffer()

        return new NextResponse(arrayBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        })
    } catch (error) {
        console.error('Error proxying 3D model:', error)
        return new NextResponse('Failed to load 3D model', { status: 500 })
    }
}
