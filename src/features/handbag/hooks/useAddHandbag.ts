import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHandbag } from "../api/handbagApi";
import { Handbag } from "../types/handbag";

export const useAddHandbag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newHandbag: Omit<Handbag, "id">) => createHandbag(newHandbag),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["handbags"] });
    },
  });
};