import { HttpTypes } from "@medusajs/types"

export type CategoryNavigation = Pick<HttpTypes.StoreProductCategory, "id" | "name" | "handle"> & {
  parent_category: Pick<HttpTypes.StoreProductCategory, "id"> | null
  category_children: CategoryNavigation[]
}

// Only serialize the fields navigation needs, never the category's products.
export function toCategoryNavigation(category: HttpTypes.StoreProductCategory): CategoryNavigation {
  return {
    id: category.id,
    name: category.name,
    handle: category.handle,
    parent_category: category.parent_category ? { id: category.parent_category.id } : null,
    category_children: (category.category_children ?? []).map(toCategoryNavigation),
  }
}
