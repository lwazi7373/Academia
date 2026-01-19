import { useQuery } from "@tanstack/react-query";
import { moduleApi } from "./module.api";

// Query Keys
export const moduleKeys = {
  all: ['module'] as const,
  moduleDetail: (moduleId: number) =>
    [...moduleKeys.all, 'detail', moduleId] as const,
};

/**
 * Get a single module by ID
 */
export const useGetModule = (moduleId: number,enabled = true) => {
  return useQuery({
    queryKey: moduleKeys.moduleDetail(moduleId),
    queryFn: () => moduleApi.getModule(moduleId),
    enabled: enabled && moduleId > 0,
    staleTime: 15 * 60 * 1000, // 15 minutes (modules rarely change)
  });
};
