import { View } from "react-native";

export const ScallopedCard = ({ children }: { children: React.ReactNode }) => (
  <View className="border-2 border-border rounded-3xl p-6 relative">
    <View className="absolute -top-0.5 left-2 w-1.5 h-1.5 bg-border rounded-full" />
    <View className="absolute -bottom-0.5 left-2 w-1.5 h-1.5 bg-border rounded-full" />
    {children}
  </View>
);