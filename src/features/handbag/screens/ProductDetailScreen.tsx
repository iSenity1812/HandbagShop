import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";

import { ProductHeader } from "../components/ProductHeader";
import { ProductImage } from "../components/ProductImage";
import { ProductInfo } from "../components/ProductInfo";
import { ReviewSection } from "../components/ReviewSection";
import { useGetHandbagById } from "../hooks/useGetHandbagById";
;

type ParamList = {
  ProductDetail: { id: string };
};

export default function ProductDetailScreen() {
  const route = useRoute<RouteProp<ParamList, "ProductDetail">>();
  const { id } = route.params;

  const { data: product, isLoading } = useGetHandbagById(id);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 pt-10 bg-background">
      <ProductHeader product={product} />

      <ScrollView showsVerticalScrollIndicator={false} className="px-4 mt-2">
        <View className="scalloped-border p-1 bg-white mb-6">
          <ProductImage uri={product.uri} />
        </View>

        <ProductInfo product={product} />

        <ReviewSection productId={product.id} />
      </ScrollView>
    </View>
  );
}