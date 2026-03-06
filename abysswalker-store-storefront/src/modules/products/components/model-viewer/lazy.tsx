"use client"

import dynamic from "next/dynamic"
import ModelViewerSkeleton from "@modules/skeletons/components/skeleton-model-viewer"

const ModelViewer = dynamic(() => import("@modules/products/components/model-viewer"), {
    ssr: false,
    loading: () => <ModelViewerSkeleton />,
})

type LazyModelViewerProps = {
    modelUrl: string
    className?: string
}

export default function LazyModelViewer(props: LazyModelViewerProps) {
    return <ModelViewer {...props} />
}