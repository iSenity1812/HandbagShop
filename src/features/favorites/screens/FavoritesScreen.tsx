import { CheckSquare, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import { useFavorites } from "@/src/features/favorites/hooks/useFavorites";
import { ConfirmModal } from "@/src/shared/components/ConfirmModal";
import { useGetHandbags } from "../../handbag/hooks/useGetHandbags";
import EmptyFavorites from "../components/EmptyFavorites";
import FavoriteItem from "../components/FavoriteItem";

export default function FavoritesScreen() {
  const { favorites, removeFavorite, clearAllFavorites } = useFavorites();
  const { data: products = [] } = useGetHandbags();

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [showClearAll, setShowClearAll] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showRemoveSelected, setShowRemoveSelected] = useState(false);

  const favoriteProducts = products.filter((p) =>
    favorites.includes(p.id)
  );

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const quitSelectionMode = () => {
    setIsSelectionMode(false);
    setSelectedItems([]);
  };

  return (
    <View className="flex-1 pt-10 bg-background">
      {/* Header */}
      <View className="p-4 flex-row justify-between items-center border-b border-gray-200">
        <Text className="text-xl font-bold font-display text-foreground">
          Favorites
        </Text>

        <View className="flex-row gap-2">
          {favoriteProducts.length > 1 && !isSelectionMode && (
            <Pressable
              onPress={() => setIsSelectionMode(true)}
              className="flex-row items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full"
            >
              <CheckSquare size={16} color="#666" />
              <Text className="text-[#666] text-xs font-bold font-body">
                Select
              </Text>
            </Pressable>
          )}

          {isSelectionMode && (
            <Pressable
              onPress={quitSelectionMode}
              className="flex-row items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full"
            >
              <Text className="text-[#666] text-xs font-bold font-body">
                Cancel
              </Text>
            </Pressable>
          )}

          {isSelectionMode && selectedItems.length > 0 && (
            <Pressable
              onPress={() => setShowRemoveSelected(true)}
              className="flex-row items-center gap-2 px-3 py-1.5 bg-[#A45A63]/10 rounded-full"
            >
              <Trash2 size={16} color="#A45A63" />
              <Text className="text-[#A45A63] text-xs font-bold font-body">
                Remove ({selectedItems.length})
              </Text>
            </Pressable>
          )}

          {!isSelectionMode && favoriteProducts.length > 1 && (
            <Pressable
              onPress={() => setShowClearAll(true)}
              className="flex-row items-center gap-2 px-3 py-1.5 bg-[#A45A63]/10 rounded-full"
            >
              <Trash2 size={16} color="#A45A63" />
              <Text className="text-[#A45A63] text-xs font-bold font-body">
                Clear All
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Content */}
      {favoriteProducts.length > 0 ? (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          renderItem={({ item }) => (
            <FavoriteItem
              product={item}
              onDelete={() => setDeleteTarget(item.id)}
              isSelectionMode={isSelectionMode}
              isSelected={selectedItems.includes(item.id)}
              onSelect={() => toggleSelection(item.id)}
            />
          )}
        />
      ) : (
        <EmptyFavorites />
      )}

      {/* Delete single item modal */}
      <ConfirmModal
        open={deleteTarget !== null}
        title="Remove from Favorites"
        description="Are you sure you want to remove this handbag from your favorites?"
        onConfirm={() => {
          if (deleteTarget) removeFavorite(deleteTarget);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Remove selected items modal */}
      <ConfirmModal
        open={showRemoveSelected}
        title="Remove Selected"
        description={`Are you sure you want to remove ${selectedItems.length} handbag${selectedItems.length > 1 ? 's' : ''} from your favorites?`}
        onConfirm={() => {
          selectedItems.forEach((id) => removeFavorite(id));
          quitSelectionMode();
          setShowRemoveSelected(false);
        }}
        onCancel={() => setShowRemoveSelected(false)}
      />

      {/* Clear all modal */}
      <ConfirmModal
        open={showClearAll}
        title="Clear All Favorites"
        description="This will remove all handbags from your favorites list."
        onConfirm={() => {
          clearAllFavorites();
          setShowClearAll(false);
        }}
        onCancel={() => setShowClearAll(false)}
      />
    </View>
  );
}