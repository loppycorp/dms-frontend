import { notFound } from "next/navigation";
import { fetchPages } from "@/utils/fetch-utils";
import DisplayPageContent from "@/app/system/[...slug]/DisplayPageContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
type PageParamsType = {
  params: { slug: string[] };
};

export default async function Page({ params }: PageParamsType) {
  const session = await getServerSession(authOptions);
  const page = await fetchPages(params.slug.join("/"));
  if (!page) return notFound();

  return (
    <div className="p-4 h-full relative ">
      {
        // @ts-ignore
        <DisplayPageContent page={page} session={session} />
      }
    </div>
  );
}

// export async function generateStaticParams() {
//   const pagesRes = await fetchAPIFromCMS("/pages");
//   const items: PageItem[] = pagesRes.data;
//   return items.map((item) => ({
//     slug: item.slug.split("/"),
//   }));
// }
