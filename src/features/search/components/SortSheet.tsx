import { Pressable, Text, View } from "react-native";
import { BottomSheet } from "../../../shared/components/BottomSheet";
import { SortOption } from "../types/search";

interface Props {
  open: boolean;
  sort: SortOption;
  onClose: () => void;
  onSelect: (v: SortOption) => void;
}

export function SortSheet({ open, onClose, sort, onSelect }: Props) {
  const options: [SortOption, string][] = [
    ["none", "Default"],
    ["price-asc", "Price: Low → High"],
    ["price-desc", "Price: High → Low"],
  ];

  return (
    <BottomSheet open={open} onClose={onClose} title="Sort By">
      <View>
        {options.map(([value, label]) => {
          const active = value === sort;

          return (
            <Pressable
              key={value}
              onPress={() => onSelect(value)}
              style={{
                padding: 16,
                backgroundColor: active ? "#000" : "transparent",
              }}
            >
              <Text style={{ color: active ? "#fff" : "#000" }}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </BottomSheet>
  );
}