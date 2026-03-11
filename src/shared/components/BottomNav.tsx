import { TabParamList } from "@/src/app/navigation/BottomTabNavigator";
import { useFavorites } from "@/src/features/favorites/hooks/useFavorites";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Heart, Home } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export function BottomNav({ state, navigation }: BottomTabBarProps) {
  const { favorites } = useFavorites();

  const visibleTabs = state.routes.filter(
    (route) => route.name === "Home" || route.name === "Favorites"
  );

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex-row">
      {visibleTabs.map((route) => {
        const routeIndex = state.routes.findIndex((r) => r.key === route.key);
        const active = state.index === routeIndex;

        const Icon = route.name === "Home" ? Home : Heart;

        return (
          <Pressable
            key={route.key}
            onPress={() =>
              navigation.navigate(route.name as keyof TabParamList)
            }
            className="flex-1 items-center py-2 relative"
          >
            <View className="relative">
              <Icon size={20} color={active ? "#000" : "#6b7280"} />

              {route.name === "Favorites" && favorites.length > 0 && (
                <View className="absolute -top-1 -right-2 bg-rose-500 w-4 h-4 rounded-full items-center justify-center">
                  <Text className="text-white text-[10px] font-bold">
                    {favorites.length}
                  </Text>
                </View>
              )}
            </View>

            <Text
              className={`text-[10px] mt-1 ${active ? "text-black" : "text-gray-500"
                }`}
            >
              {route.name}
            </Text>

            {active && (
              <View className="absolute top-0 w-8 h-[2px] bg-black rounded-full" />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}