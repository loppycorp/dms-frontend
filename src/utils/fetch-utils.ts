import { fetchAPIFromCMS } from "@/lib/api";

export const fetchPages = async (slug: string) => {
  const pagesItemsRes = await fetchAPIFromCMS(
    `/pages`,
    { populate: "deep,10", "filters[slug][$eq]": slug },
    {
      cache: "no-cache",
      // next: { revalidate: 3600 },
    }
  );
  const items: PageItem = pagesItemsRes.data[0];
  return items;
};
