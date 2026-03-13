import { Pressable, ScrollView, Text, View } from "react-native";
import { BottomSheet } from "../../../shared/components/BottomSheet";
import { Filters } from "../types/search";
import { ChipGroup } from "./ChipGroup";

interface Props {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  onChange: (f: Filters) => void;
  onApply: () => void;
}

export function FilterSheet({ open, onClose, filters, onChange, onApply }: Props) {
  const updateFilter = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value === filters[key] ? value : value });
  };

  const discountOptions = ["any", "yes", "no"];
  const discountLabels = ["Any", "On Sale", "Full Price"];

  const brandOptions = ["All", "Maison Élégance", "Atelier Noir", "Casa di Lusso", "Gucci", "Michael Kors"];

  const categoryOptions = ["All", "Tote", "Crossbody", "Satchel", "Clutch", "Backpack", "Shoulder Bag", "Bucket", "Briefcase", "Hobo"];

  const colorOptions = ["All", "Black", "Gold", "Burgundy", "Brown", "Tan", "Navy", "White", "Cream", "Pink", "Rose", "Silver", "Crystal", "Green"];

  const genderOptions = ["All", "Women", "Unisex"];

  return (
    <BottomSheet open={open} onClose={onClose} title="Filters">
      <ScrollView className="max-h-[600px]" showsVerticalScrollIndicator={false}>
        <View className="p-4 gap-6 pb-24">

          <View>
            <Text className="font-bold font-display text-[#3A2E2A] text-sm mb-3">Discount</Text>
            <ChipGroup
              options={discountOptions}
              labels={discountLabels}
              value={filters.discount || "any"}
              onChange={(v) => updateFilter("discount", v)}
            />
          </View>

          <View>
            <Text className="font-bold font-display text-[#3A2E2A] text-sm mb-3">Brand</Text>
            <ChipGroup
              options={brandOptions}
              labels={brandOptions}
              value={filters.brand || "All"}
              onChange={(v) => updateFilter("brand", v === "All" ? "" : v)}
            />
          </View>

          <View>
            <Text className="font-bold font-display text-[#3A2E2A] text-sm mb-3">Category</Text>
            <ChipGroup
              options={categoryOptions}
              labels={categoryOptions}
              value={filters.category || "All"}
              onChange={(v) => updateFilter("category", v === "All" ? "" : v)}
            />
          </View>

          <View>
            <Text className="font-bold font-display text-[#3A2E2A] text-sm mb-3">Color</Text>
            <ChipGroup
              options={colorOptions}
              labels={colorOptions}
              value={filters.color || "All"}
              onChange={(v) => updateFilter("color", v === "All" ? "" : v)}
            />
          </View>

          <View>
            <Text className="font-bold font-display text-[#3A2E2A] text-sm mb-3">Gender</Text>
            <ChipGroup
              options={genderOptions}
              labels={genderOptions}
              value={filters.gender || "All"}
              onChange={(v) => updateFilter("gender", v === "All" ? "" : v)}
            />
          </View>

          <Pressable
            onPress={onApply}
            className="w-full bg-[#A45A63]/80 py-3 rounded-lg items-center justify-center mt-2"
          >
            <Text className="text-white font-bold font-display text-base">Apply Filters</Text>
          </Pressable>

        </View>
      </ScrollView>
    </BottomSheet>
  );
}
