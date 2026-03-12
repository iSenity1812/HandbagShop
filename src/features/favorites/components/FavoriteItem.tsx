import { TabParamList } from "@/src/app/navigation/BottomTabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { CheckCircle2, Circle, Trash2 } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

type NavigationProp = BottomTabNavigationProp<TabParamList, "Home">;

export default function FavoriteItem({
  product,
  onDelete,
  isSelectionMode,
  isSelected,
  onSelect,
}: any) {
  const navigation = useNavigation<NavigationProp>();

  const discountedPrice =
    product.cost * (1 - product.percentOff / 100);

  return (
    <Pressable
      onPress={() => {
        if (isSelectionMode) {
          onSelect?.();
        } else {
          navigation.navigate("ProductDetail", { id: product.id });
        }
      }}
      style={{
        flexDirection: "row",
        borderWidth: 1,
        borderColor: isSelected ? "#A45A63" : "#eee",
        backgroundColor: isSelected ? "#A45A6311" : "transparent",
        borderRadius: 10,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {isSelectionMode && (
        <View style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
          {isSelected ? (
            <CheckCircle2 size={20} color="#A45A63" fill="#fff" />
          ) : (
            <Circle size={20} color="#999" fill="#fff" />
          )}
        </View>
      )}

      <Image
        source={{ uri: product.uri }}
        style={{ width: 100, height: 100 }}
      />

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

        {!isSelectionMode && (
          <Pressable
            onPress={onDelete}
            style={{ alignSelf: "flex-end" }}
          >
            <Trash2 size={18} color="#999" />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}