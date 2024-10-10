"use client";

import { useRouter, usePathname } from "@/src/shared/config/routing";
import { useParams, useSearchParams } from "next/navigation";

export const useLocation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const s = useSearchParams();
  const getSearchParam = (key: string) => {
    return s.get(key);
  };
  const changeSearchParam = (key: string, value: string): string => {
    const { searchParams, url } = getAllSearchParams();
    if (!s.has(key)) {
      return `${url}&${key}=${value}`;
    }
    searchParams[key] = value;
    return makeUrlFromObj(searchParams);
  };
  const makeUrlFromObj = (obj: Record<string, string | null>) => {
    let url = "?";
    Object.keys(obj).map((k) => {
      url = url + `&${k}=${obj[k]}`;
    });
    return url;
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
    params,
    getAllSearchParams,
    getSearchParam,
    changeSearchParam,
  };
};
