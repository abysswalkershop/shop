import InteractiveLink from "@modules/common/components/interactive-link"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default async function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <Link href="/">
        <Image src={"/404.png"} alt="404 Image" width={2000} height={806} className="w-full max-w-sm lg:max-w-lg mb-20" />
      </Link>
      <h1 className="text-2xl-semi text-ui-fg-base">Page not found</h1>
      <p className="text-small-regular text-ui-fg-base">
        The page you tried to access does not exist.
      </p>
      <InteractiveLink href="/">Home</InteractiveLink>
    </div>
  )
}
