import { request } from "@/src/infra/fetcher";
import { Review } from "../types/review";

type ReviewQuery = {
  productId: string;
  rating?: number;
}

export const getReviewByRating = async (query: ReviewQuery) => {
  const { productId, rating } = query;
  let url = `/reviews?productId=${productId}`;
  if (rating) {
    url += `&rating=${rating}`;
  }
  return request<Review[]>({
    url,
  })
}