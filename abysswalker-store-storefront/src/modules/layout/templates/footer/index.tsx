import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CategoryTree from "@modules/layout/components/category-tree"
import Link from "next/link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-abyss-dark-accent w-full bg-abyss-background">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-abyss-text-light hover:text-abyss-light-accent uppercase"
            >
              Abyss Walker
            </LocalizedClientLink>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-abyss-medium-accent">
                  Categories
                </span>
                <CategoryTree
                  categories={productCategories}
                  className="grid grid-cols-1 gap-2"
                  nestedClassName="grid grid-cols-1 gap-2 ml-3"
                  itemClassName="flex flex-col gap-2 text-abyss-text-light txt-small"
                  linkClassName="hover:text-abyss-light-accent"
                  parentLinkClassName="txt-small-plus"
                  dataTestId="footer-categories"
                />
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-abyss-medium-accent">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-abyss-text-light txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-abyss-light-accent"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-abyss-medium-accent">Social</span>
              <ul className="grid grid-cols-1 gap-y-2 text-abyss-text-light txt-small">
                <li>
                  <Link
                    href="https://blog.abysswalker.org"
                    target="_blank"
                    className="hover:text-abyss-light-accent"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://forum.abysswalker.org"
                    target="_blank"
                    className="hover:text-abyss-light-accent"
                  >
                    Forum
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://map.abysswalker.org"
                    target="_blank"
                    className="hover:text-abyss-light-accent"
                  >
                    Map
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/abysswalker_shop?igsh=MTEya2tqcWc1dzJ2aQ=="
                    target="_blank"
                    className="hover:text-abyss-light-accent"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.tiktok.com/@abysswalkerorg"
                    target="_blank"
                    className="hover:text-abyss-light-accent"
                  >
                    Tiktok
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-abyss-medium-accent">About</span>
              <ul className="grid grid-cols-1 gap-y-2 text-abyss-text-light txt-small">
                <li>
                  <LocalizedClientLink
                    href="/about"
                    target="_blank"
                    className="hover:text-abyss-light-accent"
                  >
                    The Team
                  </LocalizedClientLink>
                </li>
                <li>
                  <a
                    href="https://github.com/abysswalkershop/shop"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-abyss-light-accent"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/imprint"
                    target="_blank"
                    className="hover:text-abyss-light-accent"
                  >
                    Imprint
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/privacy-policy"
                    target="_blank"
                    className="hover:text-abyss-light-accent"
                  >
                    Privacy Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/returns"
                    target="_blank"
                    className="hover:text-abyss-light-accent"
                  >
                    Shipping Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/tos"
                    target="_blank"
                    className="hover:text-abyss-light-accent"
                  >
                    TOS
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/tou"
                    target="_blank"
                    className="hover:text-abyss-light-accent"
                  >
                    TOU
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/termsofsale"
                    target="_blank"
                    className="hover:text-abyss-light-accent"
                  >
                    Terms of Sale
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    target="_blank"
                    className="hover:text-abyss-light-accent"
                  >
                    Contact Us
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-abyss-text-light">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} EI Abyss Walker. AGPL V3 licensed.
          </Text>
        </div>
      </div>
    </footer>
  )
}
