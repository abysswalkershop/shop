import { listCategories } from "@lib/data/categories"
import { toCategoryNavigation } from "@lib/util/category-navigation"
import CategoriesNavigation from "../categories-dropdown"

export default async function CategoriesBar({
    countryCode,
}: {
    countryCode: string
}) {
    const categories = await listCategories().catch(() => [])

    return <CategoriesNavigation categories={categories.map(toCategoryNavigation)} countryCode={countryCode} />
}
