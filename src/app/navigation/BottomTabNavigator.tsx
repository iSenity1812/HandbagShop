import FavoritesScreen from "@/src/features/favorites/screens/FavoritesScreen";
import { Index } from "@/src/features/handbag/components/Index";
import AddProductScreen from "@/src/features/handbag/screens/AddProductScreen";
import ProductDetailScreen from "@/src/features/handbag/screens/ProductDetailScreen";
import SearchScreen from "@/src/features/search/screens/SearchScreen";
import { BottomNav } from "@/src/shared/components/BottomNav";
import NotFoundScreen from "@/src/shared/screens/NotFoundScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Heart, Home } from "lucide-react-native";

export type TabParamList = {
  Home: undefined;
  ProductDetail: { id: string };
  Search: undefined;
  Favorites: undefined;
  NotFound: undefined;
  AddProduct: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#b45b63',
      tabBarInactiveTintColor: '#9ca3af',
      tabBarLabelStyle: { fontFamily: 'Alice_400Regular' },
      headerShown: false,
    }} tabBar={(props) => <BottomNav {...props} />}>
      <Tab.Screen name="Home" component={Index} options={{ title: 'Home', headerShown: false, tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Search', headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Detail', headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites', headerShown: false, tabBarIcon: ({ color, size }) => <Heart color={color} size={size} /> }} />
      <Tab.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Add Product', headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Not Found', headerShown: false, tabBarButton: () => null }} />
    </Tab.Navigator>
  )
}