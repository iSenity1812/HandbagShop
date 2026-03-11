import { Alice_400Regular, useFonts } from "@expo-google-fonts/alice";
import { Quattrocento_400Regular, Quattrocento_700Bold } from "@expo-google-fonts/quattrocento";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import "../../../global.css";
import BottomTabNavigator from "./BottomTabNavigator";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Alice_400Regular,
    Quattrocento_400Regular,
    Quattrocento_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BottomTabNavigator />
    </QueryClientProvider>
  )
}