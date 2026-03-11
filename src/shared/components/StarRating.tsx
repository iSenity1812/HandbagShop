import { Star } from "lucide-react-native";
import { View } from "react-native";

export function StarRating({ rating }: { rating: number }) {
  return (
    <View className="flex-row gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= rating;

        return (
          <Star
            key={star}
            size={12}
            color={active ? "#EAB308" : "#D1D5DB"}
            fill={active ? "#EAB308" : "none"}
          />
        );
      })}
    </View>
  );
}