import { supabase } from "@/src/infra/supabase";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { ArrowLeft, ImagePlus } from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAddHandbag } from "../hooks/useAddHandbag";

export default function AddProductScreen() {
  const navigation = useNavigation();
  const { mutateAsync: addHandbag, isPending } = useAddHandbag();

  const [handbagName, setHandbagName] = useState("");
  const [brand, setBrand] = useState("");
  const [cost, setCost] = useState("");
  const [percentOff, setPercentOff] = useState("0");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState(true); // true = Women, false = Unisex
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      console.log('--- 🚀 BẮT ĐẦU UPLOAD ---');
      console.log('📍 File gốc:', uri);

      // 1. Đọc dữ liệu file
      // Sử dụng fetch + arrayBuffer là cách ổn định nhất trên Expo hiện tại
      const response = await fetch(uri);
      console.log('Raw fetch response:', response);
      const arrayBuffer = await response.arrayBuffer();

      if (arrayBuffer.byteLength === 0) {
        console.error('❌ File trống hoặc không đọc được');
        return null;
      }
      console.log('✅ Đã chuyển đổi sang ArrayBuffer:', arrayBuffer.byteLength, 'bytes');

      // 2. Cấu hình thông tin file
      // LƯU Ý: Nên đổi tên bucket thành 'post-images' (gạch ngang) nếu 'post images' vẫn lỗi
      const bucketName = 'post images';
      const fileExt = uri.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `handbags/${Date.now()}.${fileExt}`;
      const contentType = `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`;

      console.log(`📤 Đang tải lên: ${bucketName}/${fileName}`);

      // 3. Thực hiện Upload
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, arrayBuffer, {
          contentType: contentType,
          upsert: false,
        });

      if (error) {
        // In chi tiết lỗi để debug
        console.error('❌ LỖI SUPABASE:', error.message);
        console.error('Chi tiết:', JSON.stringify(error, null, 2));

        if (error.message.includes('row-level security')) {
          console.warn('💡 Gợi ý: Kiểm tra lại RLS Policy trên Supabase Dashboard!');
        }
        return null;
      }

      // 4. Lấy URL công khai
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      console.log('✅ UPLOAD THÀNH CÔNG!');
      console.log('🔗 Public URL:', publicUrl);

      return publicUrl;

    } catch (e) {
      console.error('💥 LỖI HỆ THỐNG (CATCH):', e);
      return null;
    }
  };




  const handleSave = async () => {
    if (!handbagName || !brand || !cost || !category || !imageUri) {
      Alert.alert("Error", "Please fill in all required fields and select an image.");
      return;
    }

    try {
      setIsUploading(true);
      let uploadedUrl = imageUri;

      // If it's a local file (file://), upload it
      if (imageUri.startsWith("file://")) {
        const url = await uploadImage(imageUri);
        if (!url) {
          Alert.alert("Error", "Failed to upload image. Please try again.");
          return;
        }
        uploadedUrl = url;
      }

      await addHandbag({
        handbagName,
        brand,
        cost: parseFloat(cost) || 0,
        percentOff: parseFloat(percentOff) || 0,
        category,
        color: color.split(",").map(c => c.trim()).filter(Boolean),
        gender,
        uri: uploadedUrl,
      });

      navigation.goBack();
    } catch (e) {
      console.error("Save error", e);
      alert("Failed to save product.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAF5F0]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-[#FAF5F0] border-b border-gray-200">
        <Pressable onPress={() => navigation.goBack()} className="p-1">
          <ArrowLeft size={24} color="#3A2E2A" />
        </Pressable>
        <Text className="flex-1 text-center font-display text-xl text-[#3A2E2A] mr-6">
          Add New Handbag
        </Text>
      </View>

      <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Image Picker */}
        <View className="items-center mb-6">
          <Pressable
            onPress={pickImage}
            className="w-32 h-32 bg-white rounded-2xl items-center justify-center border border-dashed border-[#A45A63]/50 overflow-hidden"
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} className="w-full h-full" />
            ) : (
              <View className="items-center">
                <ImagePlus size={32} color="#A45A63" />
                <Text className="text-[#A45A63] text-xs font-body mt-2">Add Photo</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Form Fields */}
        <View className="space-y-4 gap-4">
          <View>
            <Text className="text-sm font-bold text-[#3A2E2A] mb-1 font-body">Product Name *</Text>
            <TextInput
              value={handbagName}
              onChangeText={setHandbagName}
              placeholder="E.g. Classic Quilted Tote"
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 font-body text-[#3A2E2A]"
            />
          </View>

          <View>
            <Text className="text-sm font-bold text-[#3A2E2A] mb-1 font-body">Brand *</Text>
            <TextInput
              value={brand}
              onChangeText={setBrand}
              placeholder="E.g. Chanel"
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 font-body text-[#3A2E2A]"
            />
          </View>

          <View className="flex-row space-x-4 gap-4">
            <View className="flex-1">
              <Text className="text-sm font-bold text-[#3A2E2A] mb-1 font-body">Cost ($) *</Text>
              <TextInput
                value={cost}
                onChangeText={setCost}
                keyboardType="numeric"
                placeholder="0.00"
                className="bg-white border border-gray-300 rounded-xl px-4 py-3 font-body text-[#3A2E2A]"
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-[#3A2E2A] mb-1 font-body">Discount (%)</Text>
              <TextInput
                value={percentOff}
                onChangeText={setPercentOff}
                keyboardType="numeric"
                placeholder="0"
                className="bg-white border border-gray-300 rounded-xl px-4 py-3 font-body text-[#3A2E2A]"
              />
            </View>
          </View>

          <View>
            <Text className="text-sm font-bold text-[#3A2E2A] mb-1 font-body">Category *</Text>
            <TextInput
              value={category}
              onChangeText={setCategory}
              placeholder="E.g. Shoulder Bag"
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 font-body text-[#3A2E2A]"
            />
          </View>

          <View>
            <Text className="text-sm font-bold text-[#3A2E2A] mb-1 font-body">Colors</Text>
            <TextInput
              value={color}
              onChangeText={setColor}
              placeholder="E.g. Black, White, Red (Comma separated)"
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 font-body text-[#3A2E2A]"
            />
          </View>

          <View className="flex-row items-center justify-between bg-white border border-gray-300 rounded-xl px-4 py-3">
            <Text className="text-sm font-bold text-[#3A2E2A] font-body">
              {gender ? "Target: Women" : "Target: Unisex"}
            </Text>
            <Switch
              value={gender}
              onValueChange={setGender}
              trackColor={{ false: "#e5e7eb", true: "#A45A63" }}
              thumbColor={gender ? "#ffffff" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Submit Button */}
        <Pressable
          onPress={handleSave}
          disabled={isPending || isUploading}
          className={`mt-8 py-4 rounded-xl items-center ${isPending || isUploading ? "bg-gray-400" : "bg-[#A45A63]"
            }`}
        >
          {isPending || isUploading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold font-body text-lg">Save Handbag</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}