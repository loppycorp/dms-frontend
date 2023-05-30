"use client";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { metadata } from "@/data/metadata";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import Image from "next/image";

function SidebarHandler(props: {
  children: React.ReactNode;
  className?: string | null;
}) {
  return (
    <>
      <aside
        className={`${props.className} relative z-40 flex-shrink-0 h-full overflow-y-auto custom-scrollbar shadow-lg`}
      >
        <div className="flex h-16 gap-4 items-center w-full justify-between pr-2">
          {/* <!-- TITLE --> */}
          <Link
            className="ml-8 text-lg font-bold text-black z-50 flex items-center gap-2"
            href="/"
          >
            <Image src="/logo.png" alt="" width={30} height={30} />

            {metadata.short_title}
          </Link>
        </div>

        <div className="mt-2">{props.children}</div>
      </aside>
    </>
  );
}

export default SidebarHandler;
