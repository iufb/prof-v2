"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useLocation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  return { pathname, router, searchParams };
};
