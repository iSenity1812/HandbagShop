import { StarRating } from "@/src/shared/components/StarRating";
import { Star } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useReview } from "../hooks/useReview";
import { ReviewItem } from "./ReviewItem";

export function ReviewSection({ productId }: { productId: string }) {
  const { data: allReviews, isLoading } = useReview({ productId });
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const stats = useMemo(() => {
    if (!allReviews) return { average: 0, counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, total: 0 };
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>;
    let sum = 0;
    allReviews.forEach((review) => {
      if (counts[review.rating] !== undefined) {
        counts[review.rating]++;
      }
      sum += review.rating;
    });
    return {
      average: allReviews.length > 0 ? (sum / allReviews.length).toFixed(1) : "0.0",
      counts,
      total: allReviews.length,
    };
  }, [allReviews]);

  const filteredReviews = useMemo(() => {
    if (!allReviews) return [];
    if (selectedRating === null) return allReviews;
    return allReviews.filter((r) => r.rating === selectedRating);
  }, [allReviews, selectedRating]);

  if (isLoading) {
    return (
      <View className="py-8 items-center">
        <ActivityIndicator size="small" color="#A45A63" />
      </View>
    );
  }

  return (
    <View className="mt-4 mb-10 bg-[#FAF5F0] px-4 pb-8">
      <Text className="text-center font-display text-lg text-[#3A2E2A] mb-6">
        Customer Feedback
      </Text>

      {stats.total === 0 ? (
        <Text className="text-center text-gray-500 font-body py-4">No reviews yet for this product.</Text>
      ) : (
        <>
          {/* Stats Summary */}
          <View className="flex-row items-center mb-6">
            <View className="items-center mr-6">
              <Text className="text-4xl font-display text-[#3A2E2A]">{stats.average}</Text>
              <StarRating rating={Math.round(Number(stats.average))} />
              <Text className="text-xs text-gray-500 mt-1 font-body">{stats.total} Reviews</Text>
            </View>

            <View className="flex-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats.counts[star];
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <View key={star} className="flex-row items-center mb-1">
                    <Text className="text-xs text-gray-600 font-body w-3">{star}</Text>
                    <View className="mx-1">
                      <View className="flex-row gap-0.5">
                        <Star color="#EAB308" size={12} fill="#EAB308" />
                      </View>
                    </View>
                    <View className="flex-1 h-2 bg-gray-200 rounded-full mx-2 overflow-hidden">
                      <View
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </View>
                    <Text className="text-xs text-gray-500 font-body w-6 text-right">{count}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Filters */}
          <View className="flex-row flex-wrap gap-2 mb-6">
            <TouchableOpacity
              onPress={() => setSelectedRating(null)}
              className={`px-3 py-1.5 rounded-full border ${selectedRating === null ? "bg-[#A45A63] border-[#A45A63]" : "bg-white border-gray-300"
                }`}
            >
              <Text className={`font-body text-sm ${selectedRating === null ? "text-white" : "text-gray-600"}`}>
                All
              </Text>
            </TouchableOpacity>
            {[5, 4, 3, 2, 1].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setSelectedRating(star)}
                className={`px-3 py-1.5 rounded-full border flex-row items-center ${selectedRating === star ? "bg-[#A45A63] border-[#A45A63]" : "bg-white border-gray-300"
                  }`}
              >
                <Text className={`font-body text-md ${selectedRating === star ? "text-white" : "text-gray-600"}`}>
                  {star}
                </Text>
                <View className="ml-[0.1rem] mr-1">
                  <Star color={selectedRating === star ? "#FFFFFF" : "#EAB308"} size={9} fill={selectedRating === star ? "#FFFFFF" : "#EAB308"} />
                </View>
                <Text className={`font-body text-sm ${selectedRating === star ? "text-white" : "text-gray-600"}`}>
                  ({stats.counts[star]})
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Reviews List */}
          <View>
            {filteredReviews.length === 0 ? (
              <Text className="text-gray-500 font-body text-center py-6 bg-white rounded-xl border border-dashed border-gray-300">
                No reviews found for {selectedRating} stars.
              </Text>
            ) : (
              filteredReviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))
            )}
          </View>
        </>
      )}
    </View>
  );
}