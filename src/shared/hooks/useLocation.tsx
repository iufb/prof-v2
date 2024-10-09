"use client";

import { useRouter, usePathname } from "@/src/shared/config/routing";
import { useSearchParams } from "next/navigation";

export const useLocation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const s = useSearchParams();
  const getSearchParam = (key: string) => {
    return s.get(key);
  };
  const getAllSearchParams = (): {
    searchParams: Record<string, string | null>;
    url: string;
  } => {
    const searchParams: Record<string, string | null> = {};
    let url = "?";
    s.keys().forEach((key) => {
      searchParams[key] = s.get(key);
      url = url + `&${key}=${s.get(key)}`;
    });
    return { searchParams, url };
  };

  return {
    pathname,
    router,
    getAllSearchParams,
    getSearchParam,
  };
};
