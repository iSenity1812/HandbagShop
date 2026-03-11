import { request } from "@/src/infra/fetcher";
import { Handbag } from "../types/handbag";

export const getAllHandbags = async () => {
  return request<Handbag[]>({
    url: "/handbags",
  });
};

export const getHandbagById = async (id: string) => {
  return request<Handbag>({
    url: `/handbags/${id}`,
  });
};
