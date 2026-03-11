export const handbagKeys = {
  all: ["handbags"] as const,
  detail: (id: string) => [...handbagKeys.all, "detail", id] as const,
};
