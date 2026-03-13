import { StarRating } from "@/src/shared/components/StarRating";
import React from "react";
import { Text, View } from "react-native";
import { Review } from "../types/review";

export function ReviewItem({ review }: { review: Review }) {
  // Format date nicely e.g. "Dec 1, 2025"
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <View className="bg-white rounded-xl border border-dashed border-gray-300 p-4 mb-4">
      <View className="flex-row justify-between items-start mb-2">
        <View>
          <View className="flex-row items-center gap-2 mb-1">
            <Text className="font-bold text-[#3A2E2A] text-base">{review.userName}</Text>
            {review.verifiedPurchase && (
              <View className="bg-green-100 px-2 py-0.5 rounded-sm">
                <Text className="text-green-800 text-[10px] font-bold">Verified</Text>
              </View>
            )}
          </View>
          <StarRating rating={review.rating} />
        </View>
        <Text className="text-gray-400 font-body text-xs">{formattedDate}</Text>
      </View>

      <Text className="font-bold text-[#3A2E2A] mb-1">{review.title}</Text>
      <Text className="text-gray-600 font-body leading-5 italic">
        &quot;{review.comment}&quot;
      </Text>
    </View>
  );
}
