import { Container } from "@medusajs/ui";

export default function ModelViewerSkeleton() {
    return (
        <Container className="relative aspect-square w-full overflow-hidden bg-ui-bg-subtle">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-2 border-abyss-background border-t-abyss-light-accent rounded-full animate-spin"></div>
                    <div className="text-sm text-abyss-text-light">Preparing 3D viewer...</div>
                </div>
            </div>
            <div className="absolute top-2 right-2 bg-abyss-background/50 text-abyss-text-light text-xs px-2 py-1 rounded">
                3D Model
            </div>
        </Container>
    )
}
