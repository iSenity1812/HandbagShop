import { Heart } from "lucide-react-native";
import { Text, View } from "react-native";

export default function EmptyFavorites() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Heart size={48} color="#ddd" />

      <Text style={{ fontSize: 18, marginTop: 10 }}>
        No favorites yet
      </Text>

      <Text style={{ color: "#777", marginTop: 4 }}>
        Tap the heart icon to save handbags
      </Text>
    </View>
  );
}