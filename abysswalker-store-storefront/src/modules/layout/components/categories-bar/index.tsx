import { listCategories } from "@lib/data/categories"
import CategoriesNavigation from "../categories-dropdown"

export default async function CategoriesBar() {
    const categories = await listCategories().catch(() => [])

    return <CategoriesNavigation categories={categories} />
}
