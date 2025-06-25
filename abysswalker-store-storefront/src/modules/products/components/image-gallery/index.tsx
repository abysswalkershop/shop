import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { Suspense } from "react"
import ModelViewer from "@modules/products/components/model-viewer"
import { isValid3DModelUrl } from "@lib/util/3d-models"
import ModelViewerSkeleton from "@modules/skeletons/components/skeleton-model-viewer"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  product: HttpTypes.StoreProduct
}


const ImageGallery = ({ images, product }: ImageGalleryProps) => {
  // Check if product has a valid 3D model in metadata
  const modelUrl = product.metadata?.["3dmodel"] as string | undefined
  const hasValid3DModel = modelUrl && isValid3DModelUrl(modelUrl)

  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {/* Render 3D model viewer first if available and valid */}
        {hasValid3DModel && (
          <Suspense fallback={<ModelViewerSkeleton />}>
            <ModelViewer modelUrl={modelUrl} />
          </Suspense>
        )}

        {/* Render regular images */}
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-square w-full overflow-hidden bg-ui-bg-subtle"
              id={image.id}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0 rounded-rounded"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
