"use client";
import Link from "next/link";
import RouteHandler from "@/utils/route-handler";

function WindowTab(props: { title: string; index: number }) {
  const route = RouteHandler({ url: props.title });
  if (!route.params && props.index == 1) route.setActivePage();

  return (
    <Link
      href={route.newPath || ""}
      className={`w-full py-2.5 text-center text-sm leading-5 focus:outline-none rounded-t-3xl border-b ${
        route.params === route.slug
          ? "bg-light text-primary cursor-default font-bold"
          : "text-gray-500 bg-light-dark hover:bg-light focus:bg-light font-normal"
      }`}
      draggable={false}
    >
      {props.title.toUpperCase()}
    </Link>
  );
}

export default WindowTab;
