import { TabParamList } from "@/src/app/navigation/BottomTabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Heart } from "lucide-react-native";
import { MotiView } from "moti";
import { Image, Pressable, Text, View } from "react-native";

interface Product {
  id: string;
  uri: string;
  handbagName: string;
  brand: string;
  cost: number;
  percentOff: number;
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

type NavigationProp = BottomTabNavigationProp<TabParamList, "Home">;


export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  const navigation = useNavigation<NavigationProp>();
  const discountedPrice = product.cost * (1 - product.percentOff / 1);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 300 }}
      className="relativebg-white rounded-xl overflow-hidden"
    >
      <Pressable
        onPress={() =>
          navigation.navigate("ProductDetail", { id: product.id })
        }
      >
        {/* IMAGE */}
        <View className="relative overflow-hidden" style={{ aspectRatio: 1 }}>
          <Image
            source={{ uri: product.uri }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {product.percentOff > 0 && (
            <View className="absolute top-3 left-3 px-2 py-1 rounded" style={{ backgroundColor: "rgba(180,91,99,0.9)" }}>
              <Text className="text-white text-xs font-body font-bold tracking-wider">
                {Math.round(product.percentOff * 100)}% OFF
              </Text>
            </View>
          )}
        </View>

        {/* CONTENT */}
        <View className="p-4 bg-background">
          <Text className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-1">
            {product.brand}
          </Text>

          <Text className="text-base font-display text-foreground mb-2" numberOfLines={1}>
            {product.handbagName}
          </Text>

          <View className="flex-row items-center gap-2">
            {product.percentOff > 0 ? (
              <>
                <Text className="text-lg font-bold text-[#b45b63] font-body">
                  ${discountedPrice.toLocaleString()}
                </Text>
                <Text className="text-sm text-muted-foreground line-through font-body">
                  ${product.cost.toLocaleString()}
                </Text>
              </>
            ) : (
              <Text className="text-lg font-bold text-[#b45b63] font-body">
                ${product.cost.toLocaleString()}
              </Text>
            )}
          </View>
        </View>
      </Pressable>

      {/* FAVORITE BUTTON */}
      <Pressable
        onPress={() => onToggleFavorite(product.id)}
        className="absolute top-3 right-3 p-2 rounded-full bg-white"
      >
        <Heart
          size={16}
          color={isFavorite ? "#f43f5e" : "#6b7280"}
          fill={isFavorite ? "#f43f5e" : "none"}
        />
      </Pressable>
    </MotiView>
  );
}