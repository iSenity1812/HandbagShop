import { TabParamList } from "@/src/app/navigation/BottomTabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, View } from "react-native";

interface Product {
  id: string;
  uri: string;
  handbagName: string;
  brand: string;
  percentOff: number;
}

interface CarouselProps {
  items: Product[];
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CAROUSEL_WIDTH = SCREEN_WIDTH - 32; // Trừ đi padding 2 bên (px-4 = 16px * 2)

type NavigationProp = BottomTabNavigationProp<TabParamList, "Home">;

export function Carousel({ items }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<NavigationProp>();
  const dotScales = useRef(items.map(() => new Animated.Value(1))).current; // Animated Value cho kích thước dấu chấm
  const dotOpacities = useRef(items.map(() => new Animated.Value(0.4))).current; // Animated Value cho độ mờ dấu chấm

  // Tự động chuyển slide
  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      const nextIndex = (current + 1) % items.length;
      scrollToIndex(nextIndex);
    }, 4000);
    return () => clearInterval(timer);
  }, [current, items.length]);

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
    setCurrent(index);
  };

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== current) {
      setCurrent(roundIndex);
    }
  }, [current]);

  // Chạy animation khi dấu chấm thay đổi
  useEffect(() => {
    Animated.stagger(
      100,
      items.map((_, i) => {
        return Animated.parallel([
          Animated.timing(dotScales[i], {
            toValue: i === current ? 1.5 : 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(dotOpacities[i], {
            toValue: i === current ? 1 : 0.4,
            duration: 300,
            useNativeDriver: false,
          }),
        ]);
      })
    ).start();
  }, [current, items.length]);

  if (items.length === 0) return null;

  return (
    <View className="relative w-full px-4">
      <View className="overflow-hidden rounded-2xl bg-muted shadow-sm">
        <FlatList
          ref={flatListRef}
          data={items}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScroll}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate("ProductDetail", { id: item.id })}
              style={{ width: CAROUSEL_WIDTH, height: CAROUSEL_WIDTH * 0.5 }}
            >
              <Image source={{ uri: item.uri }} className="w-full h-full object-cover" />

              {/* Gradient overlay để text dễ đọc hơn */}
              <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} className="absolute inset-0 justify-end p-4">
                <Text className="text-[10px] uppercase tracking-[2px] text-white/80 font-body mb-1">{item.brand}</Text>
                <Text className="text-xl font-display text-white mb-2">{item.handbagName}</Text>
                {item.percentOff > 0 && (
                  <View className="bg-rose-500 self-start mt-1 px-2 py-0.5 rounded-sm">
                    <Text className="text-white text-[10px] font-body">{Math.round(item.percentOff * 100)}% OFF</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          )}
        />

        {/* Nút điều hướng (Optional trên mobile, thường người ta vuốt tay) */}
        <TouchableOpacity
          onPress={() => scrollToIndex((current - 1 + items.length) % items.length)}
          className="absolute left-2 top-1/2 -translate-y-4 p-2 rounded-full bg-white/20 backdrop-blur-md"
        >
          <ChevronLeft size={16} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => scrollToIndex((current + 1) % items.length)}
          className="absolute right-2 top-1/2 -translate-y-4 p-2 rounded-full bg-white/20 backdrop-blur-md"
        >
          <ChevronRight size={16} color="white" />
        </TouchableOpacity>

        {/* Indicators (Dấu chấm ở dưới) */}
        <View className="absolute bottom-2 left-1/2 -translate-x-1/2 flex-row justify-center items-center gap-1.5">
          {items.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`}>
              <Animated.View
                style={{
                  width: dotScales[i].interpolate({
                    inputRange: [1, 1.5],
                    outputRange: [8, 16], // Chuyển từ scale sang kích thước thực tế (8px đến 16px)
                  }),
                  height: 8,
                  borderRadius: 9999,
                  backgroundColor: "#000", // Màu nền, có thể thay đổi
                  opacity: dotOpacities[i], // Điều chỉnh độ mờ
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}