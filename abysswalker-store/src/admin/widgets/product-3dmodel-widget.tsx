import { defineWidgetConfig } from "@medusajs/admin-sdk"
import {
    Container,
    Heading,
    Button,
    Text,
    Badge,
    toast
} from "@medusajs/ui"
import {
    DetailWidgetProps,
    AdminProduct,
} from "@medusajs/framework/types"
import { useState, useRef } from "react"

// The widget
const Product3DModelWidget = ({
    data,
}: DetailWidgetProps<AdminProduct>) => {
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const current3DModel = data.metadata?.["3dmodel"] as string || null

    const handleFileSelect = () => {
        fileInputRef.current?.click()
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.name.toLowerCase().endsWith('.glb')) {
            toast.error("Error", {
                description: "Please select a .glb file"
            })
            return
        }

        // Validate file size (limit to 50MB)
        const maxSize = 50 * 1024 * 1024 // 50MB
        if (file.size > maxSize) {
            toast.error("Error", {
                description: "File size must be less than 50MB"
            })
            return
        }

        setIsUploading(true)

        try {
            // First, upload the file using the admin file upload endpoint
            const formData = new FormData()
            formData.append("files", file)

            const uploadResponse = await fetch("/admin/uploads", {
                method: "POST",
                body: formData,
                credentials: "include",
            })

            if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text()
                throw new Error(`Upload failed: ${errorText}`)
            }

            const uploadData = await uploadResponse.json()
            const uploadedFile = uploadData.files?.[0]

            if (!uploadedFile) {
                throw new Error("No file returned from upload")
            }

            // Then, update the product metadata using our custom API route
            const updateResponse = await fetch(`/admin/products/${data.id}/3dmodel`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileUrl: uploadedFile.url
                }),
                credentials: "include"
            })

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json()
                throw new Error(errorData.error || "Product update failed")
            }

            toast.success("Success", {
                description: "3D model uploaded successfully! Please refresh the page to see the changes."
            })

            // Refresh the page to show the updated data
            setTimeout(() => {
                window.location.reload()
            }, 1000)

        } catch (error) {
            console.error("Upload error:", error)
            toast.error("Error", {
                description: error instanceof Error ? error.message : "Failed to upload 3D model"
            })
        } finally {
            setIsUploading(false)
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const handleRemove3DModel = async () => {
        try {
            setIsUploading(true)

            // Remove the 3dmodel from metadata using our custom API route
            const updateResponse = await fetch(`/admin/products/${data.id}/3dmodel`, {
                method: "DELETE",
                credentials: "include"
            })

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json()
                throw new Error(errorData.error || "Product update failed")
            }

            const responseData = await updateResponse.json()

            // Check if there was a warning about file deletion
            if (responseData.warning) {
                toast.success("Partial Success", {
                    description: "3D model metadata removed, but file may still exist in storage. Please refresh the page."
                })
            } else {
                toast.success("Success", {
                    description: "3D model completely removed from product and storage! Please refresh the page to see the changes."
                })
            }

            // Refresh the page to show the updated data
            setTimeout(() => {
                window.location.reload()
            }, 1000)

        } catch (error) {
            console.error("Remove error:", error)
            toast.error("Error", {
                description: error instanceof Error ? error.message : "Failed to remove 3D model"
            })
        } finally {
            setIsUploading(false)
        }
    }

    const getFileName = (url: string) => {
        try {
            return url.split('/').pop() || url
        } catch {
            return url
        }
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 py-4">
                <Heading level="h2">3D Model</Heading>
                {current3DModel && (
                    <Badge className="text-xs bg-green-100 text-green-800">
                        GLB File
                    </Badge>
                )}
            </div>

            <div className="px-6 py-4 space-y-4">
                {current3DModel ? (
                    <div className="space-y-3">
                        <div>
                            <Text className="text-sm font-medium mb-2">
                                Current 3D Model:
                            </Text>
                            <div className="p-3 rounded-md border">
                                <Text className="text-sm font-mono break-all">
                                    {getFileName(current3DModel)}
                                </Text>
                                <Text className="text-xs mt-1">
                                    {current3DModel}
                                </Text>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={handleFileSelect}
                                disabled={isUploading}
                            >
                                {isUploading ? "Uploading..." : "Replace Model"}
                            </Button>

                            <Button
                                variant="danger"
                                size="small"
                                onClick={handleRemove3DModel}
                                disabled={isUploading}
                            >
                                {isUploading ? "Removing..." : "Remove Model"}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="text-center py-6">
                            <Text className="text-sm mb-4">
                                No 3D model uploaded yet. Upload a .glb file for this product.
                            </Text>

                            <Button
                                variant="secondary"
                                size="small"
                                onClick={handleFileSelect}
                                disabled={isUploading}
                            >
                                {isUploading ? "Uploading..." : "Upload 3D Model"}
                            </Button>
                        </div>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".glb"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                />
            </div>
        </Container>
    );
}

// The widget's configurations
export const config = defineWidgetConfig({
    zone: "product.details.side.after",
})

export default Product3DModelWidget