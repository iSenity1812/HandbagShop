import { useQuery } from "@tanstack/react-query";
import { getReviewByRating } from "../api/reviewApi";

export const useReview = (query: { productId: string; rating?: number }) => {
  return useQuery({
    queryKey: ["reviews", query],
    queryFn: () => getReviewByRating(query),
  });
};
