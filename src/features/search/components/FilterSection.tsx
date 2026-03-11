import { Text, View } from "react-native";

export function FilterSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>
        {label}
      </Text>
      {children}
    </View>
  );
}