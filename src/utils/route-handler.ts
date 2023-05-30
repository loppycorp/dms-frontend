"use client";
import slugify from "slugify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function RouteHandler(props: { url: string }) {
  const slug = slugify(props.url, { lower: true });
  const pathName = usePathname();
  const itemParams = useSearchParams()?.get("item");
  const params = useSearchParams()?.get("tab");
  const newPath = pathName?.concat("?item=", itemParams || "", "&tab=", slug);
  const router = useRouter();

  const setActivePage = () => {
    router.replace(newPath || "");
  };

  return {
    slug: slug,
    pathName: pathName,
    newPath: newPath,
    params: params,
    setActivePage: setActivePage,
  };
}

export default RouteHandler;
