import { useDeferredValue, useMemo } from "react";
import { useGetHandbags } from "../../handbag/hooks/useGetHandbags";
import { Filters, SortOption } from "../types/search";

export function useSearchProducts(
  query: string,
  sort: SortOption,
  filters: Filters,
) {
  const { data: handbags = [] } = useGetHandbags();
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    let result = handbags.filter((p) => {
      const q = deferredQuery.toLowerCase();

      const matchesQuery =
        !q ||
        p.handbagName.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q);

      const matchesDiscount =
        filters.discount === "any" ||
        (filters.discount === "yes" && p.percentOff > 0) ||
        (filters.discount === "no" && p.percentOff === 0);

      const matchesBrand = !filters.brand || p.brand === filters.brand;

      const matchesCategory =
        !filters.category || p.category === filters.category;

      const matchesColor =
        !filters.color || (p.color && p.color.includes(filters.color));

      const matchesGender =
        !filters.gender ||
        (filters.gender === "Women" && p.gender) ||
        (filters.gender === "Unisex" && !p.gender);

      return (
        matchesQuery &&
        matchesDiscount &&
        matchesBrand &&
        matchesCategory &&
        matchesColor &&
        matchesGender
      );
    });

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.cost - b.cost);
    }

    if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.cost - a.cost);
    }

    return result;
  }, [handbags, deferredQuery, sort, filters]);

  return filtered;
}
