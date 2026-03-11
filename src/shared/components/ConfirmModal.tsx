import { Modal, Pressable, Text, View } from "react-native";

interface ConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
}

export function ConfirmModal({
  open,
  onConfirm,
  onCancel,
  title,
  description,
}: ConfirmModalProps) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      {/* Overlay */}
      <View className="flex-1 bg-black/40 items-center justify-center px-6">
        {/* Dialog */}
        <View className="w-full max-w-md bg-white rounded-xl p-6">

          <Text className="text-lg font-semibold mb-2">
            {title}
          </Text>

          <Text className="text-gray-600 mb-6">
            {description}
          </Text>

          <View className="flex-row justify-end gap-3">
            <Pressable
              onPress={onCancel}
              className="px-4 py-2 rounded-lg bg-gray-100"
            >
              <Text className="text-gray-700">Cancel</Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="px-4 py-2 rounded-lg bg-red-500"
            >
              <Text className="text-white font-semibold">
                Confirm
              </Text>
            </Pressable>
          </View>

        </View>
      </View>
    </Modal>
  );
}