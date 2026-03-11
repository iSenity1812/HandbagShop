import { X } from "lucide-react-native";
import { AnimatePresence, MotiView } from "moti";
import { Pressable, Text, View } from "react-native";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "timing", duration: 180 }}
          style={{ position: "absolute", inset: 0 }}
        >
          {/* Overlay */}
          <Pressable
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}
            onPress={onClose}
          />

          {/* Bottom Sheet */}
          <MotiView
            from={{ translateY: 400 }}
            animate={{ translateY: 0 }}
            exit={{ translateY: 400 }}
            transition={{ type: "timing", duration: 220 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85%]"
          >
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 pt-4 pb-3 border-b border-gray-200">
              <Text className="text-lg font-semibold">{title}</Text>

              <Pressable onPress={onClose} className="p-2 rounded-full">
                <X size={20} color="#6b7280" />
              </Pressable>
            </View>

            {/* Content */}
            <View className="p-6">{children}</View>
          </MotiView>
        </MotiView>
      )}
    </AnimatePresence>
  );
}