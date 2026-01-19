import { QueryClient } from "@tanstack/react-query";
import { lightyToast } from "@/shared/utils/toast";
import type { QueryKey } from "@tanstack/react-query";
import { logger } from "@/shared/utils/logger";

// 여러 쿼리를 invalidate
export async function invalidateQueries(
  queryClient: QueryClient,
  keys: QueryKey[]
) {
  await Promise.all(
    keys.map((key) => queryClient.invalidateQueries({ queryKey: key }))
  );
}

export async function handleRefresh(queryClient: QueryClient, key: QueryKey) {
  try {
    await invalidateQueries(queryClient, [key]);
    return true;
  } catch (error) {
    logger.error("Refresh failed:", error);
    lightyToast.error("새로고침에 실패했어요");
    return false;
  }
}

export function successToast(message: string) {
  lightyToast.success(message);
}

export function errorToast(message: string) {
  lightyToast.error(message);
}
