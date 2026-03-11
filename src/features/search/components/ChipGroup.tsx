import { View, Text, Pressable } from "react-native";

interface Props {
  options: string[];
  labels?: string[];
  value: string;
  onChange: (v: string) => void;
}

export function ChipGroup({ options, labels, value, onChange }: Props) {
  const displayLabels = labels || options;
  return (
    <View className="flex-row flex-wrap gap-2">
      {options.map((opt, i) => {
        const active = value === opt;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            className={`px-4 py-1.5 rounded-full border ${active ? "border-[#A45A63] bg-[#A45A63]" : "border-[#EAE2DB] bg-white"}`}
          >
            <Text className={`font-body text-xs ${active ? "text-white" : "text-[#5C4A45]"}`}>    
              {displayLabels[i]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
