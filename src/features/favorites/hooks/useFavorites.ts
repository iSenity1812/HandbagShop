import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useSyncExternalStore } from "react";

const FAVORITES_KEY = "favorite_handbags";

// Global store
let favoritesState: string[] = [];
let isLoaded = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return favoritesState;
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

// Initial load
AsyncStorage.getItem(FAVORITES_KEY).then((storedFavorites) => {
  if (storedFavorites) {
    try {
      favoritesState = JSON.parse(storedFavorites);
    } catch (e) {
      favoritesState = [];
    }
  }
  isLoaded = true;
  emitChange();
});

function setFavorites(newFavorites: string[]) {
  favoritesState = newFavorites;
  emitChange();
  if (isLoaded) {
    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesState)).catch(
      (err) => console.error("Failed to save favorites:", err),
    );
  }
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(
      favoritesState.includes(id)
        ? favoritesState.filter((fav) => fav !== id)
        : [...favoritesState, id],
    );
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites(favoritesState.filter((f) => f !== id));
  }, []);

  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  return {
    favorites,
    toggleFavorite,
    removeFavorite,
    clearAllFavorites,
    isFavorite,
    loaded: isLoaded,
  };
}
