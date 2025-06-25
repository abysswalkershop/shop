import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
    try {
        const productId = req.params.id as string
        const body = req.body as { fileUrl?: string }
        const { fileUrl } = body

        if (!productId) {
            return res.status(400).json({
                error: "Product ID is required"
            })
        }

        if (!fileUrl) {
            return res.status(400).json({
                error: "File URL is required"
            })
        }

        // Get the product module service from the container
        const productModuleService = req.scope.resolve("product")

        // Get the current product to preserve existing metadata
        const product = await productModuleService.retrieveProduct(productId)

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            })
        }

        // Update the product with the new 3D model metadata
        const updatedProduct = await productModuleService.updateProducts(productId, {
            metadata: {
                ...product.metadata,
                "3dmodel": fileUrl
            }
        })

        res.json({
            message: "3D model metadata updated successfully",
            product: updatedProduct
        })

    } catch (error) {
        console.error("Error updating product 3D model metadata:", error)
        res.status(500).json({
            error: "Internal server error",
            details: error instanceof Error ? error.message : "Unknown error"
        })
    }
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
    try {
        const productId = req.params.id as string

        if (!productId) {
            return res.status(400).json({
                error: "Product ID is required"
            })
        }

        // Get the product module service from the container
        const productModuleService = req.scope.resolve("product")
        // Get the file module service from the container
        const fileModuleService = req.scope.resolve("file")

        // Get the current product to get the file URL before removing it
        const product = await productModuleService.retrieveProduct(productId)

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            })
        }

        const fileUrl = product.metadata?.["3dmodel"] as string

        // Remove the 3D model from metadata first
        const updatedMetadata = { ...product.metadata }
        delete updatedMetadata["3dmodel"]

        // Update the product without the 3D model metadata
        const updatedProduct = await productModuleService.updateProducts(productId, {
            metadata: updatedMetadata
        })

        // If there was a file URL, attempt to delete it from storage
        if (fileUrl) {
            try {
                // Extract the file key from the URL for deletion
                // This assumes the URL format from S3 or similar storage
                const fileKey = fileUrl.split('/').pop()

                if (fileKey) {
                    // Use the correct method name for deleting files
                    await fileModuleService.deleteFiles([fileKey])
                    console.log(`Successfully deleted file: ${fileKey}`)
                }
            } catch (fileError) {
                // Log the error but don't fail the entire operation
                // The metadata has already been updated successfully
                console.warn(`Failed to delete file from storage: ${fileError}`)

                return res.json({
                    message: "3D model metadata removed successfully, but file deletion from storage failed",
                    product: updatedProduct,
                    warning: "File may still exist in storage"
                })
            }
        }

        res.json({
            message: "3D model metadata and file removed successfully",
            product: updatedProduct
        })

    } catch (error) {
        console.error("Error removing product 3D model:", error)
        res.status(500).json({
            error: "Internal server error",
            details: error instanceof Error ? error.message : "Unknown error"
        })
    }
}
