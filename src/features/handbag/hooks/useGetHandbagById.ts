import { useQuery } from "@tanstack/react-query";
import { getHandbagById } from "../api/handbagApi";
import { handbagKeys } from "../query-keys/handbagKeys";
export const useGetHandbagById = (id: string) => {
  return useQuery({
    queryKey: handbagKeys.detail(id),
    queryFn: () => getHandbagById(id),
  });
};
