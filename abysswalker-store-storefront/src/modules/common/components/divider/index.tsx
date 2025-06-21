import { clx } from "@medusajs/ui"

const Divider = ({ className }: { className?: string }) => (
  <div
    className={clx("h-px w-full border-b border-abyss-light-accent mt-1", className)}
  />
)

export default Divider
