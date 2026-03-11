export type SortOption = "none" | "price-asc" | "price-desc";

export interface Filters {
  discount: "any" | "yes" | "no";
  brand: string;
  category: string;
  color: string;
  gender: string;
}

export const defaultFilters: Filters = {
  discount: "any",
  brand: "",
  category: "",
  color: "",
  gender: "",
};
