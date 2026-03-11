import { Text, View } from "react-native";

export function ReviewSection({ productId }: { productId: string }) {
  // giả sử sau này fetch review từ API
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>
        Customer Feedback
      </Text>

      <Text>No reviews yet</Text>
    </View>
  );
}