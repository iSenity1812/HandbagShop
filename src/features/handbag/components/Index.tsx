import { useFavorites } from "@/src/features/favorites/hooks/useFavorites";
import { Carousel } from "@/src/shared/components/Carousel";
import { useNavigation } from "@react-navigation/native";
import { Search } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetHandbags } from "../hooks/useGetHandbags";
import { useGetRandomHandbags } from "../hooks/useGetRandomHandbags";
import { ProductCard } from "./ProductCard";


export const Index = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigation = useNavigation();
  const { data: products = [] } = useGetHandbags();
  const randomProducts = useGetRandomHandbags(products);

  const FloralDivider = ({ title }: { title: string }) => (
    <View className="relative flex-row items-center justify-center my-6 h-10 px-4">
      {/* Divider line */}
      <View className="absolute left-4 right-4 h-px bg-border/60" />

      {/* Text  */}
      <View className="bg-background px-4 flex-row items-center">
        <Text className="text-muted-foreground text-[10px] mx-1">❀</Text>
        <Text className="font-display text-foreground text-lg tracking-[1px]">
          {title}
        </Text>
        <Text className="text-muted-foreground text-[10px] mx-1">❀</Text>
      </View>
    </View>
  );

  // Render Header Component
  const renderHeader = () => (
    <View className="space-y-6 mb-6">
      {/* Carousel Section */}
      <View>
        <Carousel items={randomProducts} />
      </View>

      {/* Title Section */}
      <FloralDivider title="Our Collection" />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* Header */}
      <View className="z-30 bg-background/95 border-b border-border px-4 py-3">
        <Text className="font-display text-3xl font-bold text-center text-foreground mb-3">
          ❀ Luxe Atelier ❀
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Search' as never)} // Hoặc router.push('/search')
          className="flex-row items-center space-x-3 w-full px-4 py-3 mt-5 rounded-xl bg-muted border border-border"
        >
          <Search size={18} color="#666" />
          <Text className="text-muted-foreground text-sm">Search handbags...</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
        renderItem={({ item }) => (
          <View style={{
            width: "48%",
            marginBottom: 16,
            borderRadius: 12,
            backgroundColor: "white",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#d8b98a",
          }}>
            <ProductCard
              product={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
            />
          </View>
        )}
      />

    </SafeAreaView>
  )
}