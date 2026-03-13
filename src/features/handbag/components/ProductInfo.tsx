import React from "react";
import { Text, View } from "react-native";
import { Handbag } from "../types/handbag";

export function ProductInfo({ product }: { product: Handbag }) {
  const discountedPrice = product.cost * (1 - (product.percentOff || 0) / 1);

  return (
    <View className="px-4 py-2 pb-16 bg-[#FAF5F0] flex-1">
      {/* Brand & Title */}
      <Text className="text-xs uppercase tracking-widest text-gray-500 font-body mb-1 mt-2">
        {product.brand}
      </Text>
      <Text className="text-3xl font-display text-[#3A2E2A] mb-3">
        {product.handbagName}
      </Text>

      {/* Pricing */}
      <View className="flex-row items-center gap-3 mb-2">
        <Text className="text-2xl font-bold font-body text-[#A45A63]">
          ${discountedPrice.toLocaleString()}
        </Text>
        {product.percentOff > 0 && (
          <>
            <Text className="text-lg line-through text-gray-400 font-body">
              ${product.cost.toLocaleString()}
            </Text>
            <View className="bg-[#A45A63]/80 px-2 py-1 rounded-full">
              <Text className="text-white text-xs font-bold px-1">
                {Math.round(product.percentOff * 100)}% OFF
              </Text>
            </View>
          </>
        )}
      </View>

      {/* Details Card */}
      <View className="bg-white rounded-xl border border-dashed border-gray-300 p-4 mb-6">
        <Text className="font-bold text-[#3A2E2A] mb-2 font-body text-base">
          Details
        </Text>
        <Text className="text-gray-600 font-body leading-5 mb-4">
          An elegant {product.category.toLowerCase()} featuring hand-stitched details and an adjustable strap. Perfect for evening occasions or sophisticated daywear.
        </Text>

        <View className="flex-row justify-between mb-2 gap-2">
          <Text className="text-gray-500 font-body flex-1">
            Category: <Text className="text-gray-800">{product.category}</Text>
          </Text>
          <Text className="text-gray-500 font-body flex-1">
            Colors: <Text className="text-gray-800">{product.color?.join(', ') || 'N/A'}</Text>
          </Text>
        </View>
        <Text className="text-gray-500 font-body">
          For: <Text className="text-gray-800">{product.gender ? "Women" : "Unisex"}</Text>
        </Text>
      </View>
    </View>
  );
}