import { useQuery } from "@tanstack/react-query";
import { getAllHandbags } from "../api/handbagApi";
import { handbagKeys } from "../query-keys/handbagKeys";
export const useGetHandbags = () => {
  return useQuery({
    queryKey: handbagKeys.all,
    queryFn: getAllHandbags,
  });
};
