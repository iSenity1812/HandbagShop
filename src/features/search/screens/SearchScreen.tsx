import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ArrowLeft, ArrowUpDown, SlidersHorizontal } from "lucide-react-native";
import { useCallback, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

import { useFavorites } from "@/src/features/favorites/hooks/useFavorites";
import { ProductCard } from "../../handbag/components/ProductCard";
import { FilterSheet } from "../components/FilterSheet";
import { SortSheet } from "../components/SortSheet";
import { useSearchProducts } from "../hooks/useSearchProduct";
import { defaultFilters, SortOption } from "../types/search";

export default function SearchScreen() {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigation = useNavigation();

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("none");
  const [filters, setFilters] = useState(defaultFilters);

  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const filtered = useSearchProducts(query, sort, filters);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setQuery("");
        setSort("none");
        setFilters(defaultFilters);
      };
    }, [])
  );

  return (
    <View className="flex-1 mt-6 bg-[#FAF5F0]">
      {/* Top Header */}
      <View className="px-4 py-3 bg-[#FAF5F0] border-b border-gray-200">
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => navigation.goBack()} className="p-1">
            <ArrowLeft size={20} color="#3A2E2A" />
          </Pressable>

          <View className="flex-1 bg-[#A45A63]/10 border border-[#A45A63]/30 rounded-xl px-4 py-2.5">
            <TextInput
              placeholder="Search handbags..."
              placeholderTextColor="#A45A63"
              value={query}
              onChangeText={setQuery}
              className="text-[#3A2E2A] font-body p-0"
              style={{ fontSize: 16 }}
            />
          </View>
        </View>

        {/* Buttons Row */}
        <View className="flex-row gap-3 mt-4">
          <Pressable
            onPress={() => setShowSort(true)}
            className="flex-row items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white"
          >
            <ArrowUpDown size={14} color="#3A2E2A" />
            <Text className="font-body text-[#3A2E2A]">Sort</Text>
          </Pressable>

          <Pressable
            onPress={() => setShowFilter(true)}
            className="flex-row items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white"
          >
            <SlidersHorizontal size={14} color="#3A2E2A" />
            <Text className="font-body text-[#3A2E2A]">Filter</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        columnWrapperStyle={{ gap: 8, paddingHorizontal: 8 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <View className="flex-1 max-w-[50%]">
            <ProductCard
              product={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
            />
          </View>
        )}
      />

      <SortSheet
        open={showSort}
        sort={sort}
        onClose={() => setShowSort(false)}
        onSelect={(v) => {
          setSort(v);
          setShowSort(false);
        }}
      />

      <FilterSheet
        open={showFilter}
        filters={filters}
        onClose={() => setShowFilter(false)}
        onChange={setFilters}
        onApply={() => setShowFilter(false)}
      />
    </View>
  );
}
