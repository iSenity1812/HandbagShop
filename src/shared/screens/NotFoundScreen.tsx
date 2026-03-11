import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";

export default function NotFoundScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center p-5 bg-muted">
      <Text className="text-4xl font-bold mb-4">404</Text>
      <Text className="text-xl text-muted-foreground mb-4 text-center">
        Oops! Page not found
      </Text>
      <Pressable
        onPress={() => navigation.navigate("Home" as never)}
        className="bg-black py-2 px-5 rounded-lg"
      >
        <Text className="text-white">Return to Home</Text>
      </Pressable>
    </View>
  );
}