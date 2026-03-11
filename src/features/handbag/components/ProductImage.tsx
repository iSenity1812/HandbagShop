import { Image, View } from "react-native";

export function ProductImage({ uri }: { uri: string }) {
  return (
    <View style={{ width: "100%", aspectRatio: 1 }}>
      <Image
        source={{ uri }}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}