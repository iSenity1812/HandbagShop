import { TabParamList } from "@/src/app/navigation/BottomTabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Trash2 } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

type NavigationProp = BottomTabNavigationProp<TabParamList, "Home">;

export default function FavoriteItem({ product, onDelete }: any) {
  const navigation = useNavigation<NavigationProp>();

  const discountedPrice =
    product.cost * (1 - product.percentOff / 100);

  return (
    <View
      style={{
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <Pressable
        onPress={() =>
          navigation.navigate("ProductDetail", { id: product.id })
        }
      >
        <Image
          source={{ uri: product.uri }}
          style={{ width: 100, height: 100 }}
        />
      </Pressable>

      <View
        style={{
          flex: 1,
          padding: 10,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 10, color: "#777" }}>
            {product.brand}
          </Text>

          <Text
            numberOfLines={1}
            style={{ fontWeight: "600", fontSize: 14 }}
          >
            {product.handbagName}
          </Text>

          <View style={{ flexDirection: "row", gap: 6 }}>
            <Text style={{ fontWeight: "bold" }}>
              ${discountedPrice}
            </Text>

            {product.percentOff > 0 && (
              <Text
                style={{
                  textDecorationLine: "line-through",
                  color: "#999",
                }}
              >
                ${product.cost}
              </Text>
            )}
          </View>
        </View>

        <Pressable
          onPress={onDelete}
          style={{ alignSelf: "flex-end" }}
        >
          <Trash2 size={18} color="#999" />
        </Pressable>
      </View>
    </View>
  );
}