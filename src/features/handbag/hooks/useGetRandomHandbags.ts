import { useMemo } from "react";
import { Handbag } from "../types/handbag";

export const useGetRandomHandbags = (handbags: Handbag[]) => {
  const getRandomHandbags = (handbags: Handbag[]) => {
    if (!handbags || handbags.length === 0) return [];
    const shuffled = [...handbags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };
  return useMemo(() => getRandomHandbags(handbags), [handbags]);
};
