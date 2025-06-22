import { Container } from "@medusajs/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <Container className="aspect-[1/1] w-full bg-abyss-dark-accent" />
      <div className="flex justify-between text-base-regular mt-2">
        <div className="w-2/5 h-6 bg-abyss-dark-accent"></div>
        <div className="w-1/5 h-6 bg-abyss-dark-accent"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
