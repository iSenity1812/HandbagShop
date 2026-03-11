import { useFavorites } from "@/src/features/favorites/hooks/useFavorites";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Heart } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";


export function ProductHeader({ product }: any) {
  const navigation = useNavigation();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 1,
        borderColor: "#eee",
      }}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowLeft size={22} />
      </Pressable>

      <Text numberOfLines={1} style={{ fontWeight: "600", flex: 1, textAlign: "center" }}>
        {product.handbagName}
      </Text>

      <Pressable onPress={() => toggleFavorite(product.id)}>
        <Heart
          size={22}
          color={isFavorite(product.id) ? "red" : "black"}
          fill={isFavorite(product.id) ? "red" : "none"}
        />
      </Pressable>
    </View>
  );
}