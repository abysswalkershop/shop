/**
 * Creates a proxied URL for 3D models to avoid CORS issues
 * Similar to how Next.js Image component handles external images
 */
export function get3DModelUrl(originalUrl: string): string {
    if (!originalUrl) return ''

    // If it's already a local URL, return as-is
    if (originalUrl.startsWith('/')) {
        return originalUrl
    }

    // Check if it's a same-origin URL (only works in browser)
    if (typeof window !== 'undefined' && originalUrl.startsWith(window.location.origin)) {
        return originalUrl
    }

    // Proxy external URLs through our API route
    const encodedUrl = encodeURIComponent(originalUrl)
    return `/api/3d-model?url=${encodedUrl}`
}

/**
 * Validates if a URL is a valid 3D model file
 */
export function isValid3DModelUrl(url: string): boolean {
    if (!url) return false

    const validExtensions = ['.glb', '.gltf']
    const lowercaseUrl = url.toLowerCase()

    return validExtensions.some(ext => lowercaseUrl.endsWith(ext))
}
