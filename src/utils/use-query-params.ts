"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface QueryParams {
  [key: string]: string | number;
}
export default function useQueryParams<T = {}>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = searchParams;
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  function setQueryParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value));
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  }

  function getLinkWithParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value));
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";

    return `${pathname}${query}`;
  }

  return { queryParams, setQueryParams, getLinkWithParams };
}
