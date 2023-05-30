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
  const [isOpen, setOpen] = useState(true);

  return (
    <>
      <Transition
        show={!isOpen}
        as={Fragment}
        enter="transition ease-in-out duration-10 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-10 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <button
          className="btn-tiny z-50"
          aria-label="Menu"
          onClick={() => setOpen(!isOpen)}
        >
          {/*<Bars2Icon className="w-5 h-5" aria-hidden="true" />*/}
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </Transition>
      <Transition
        show={isOpen}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        as={Fragment}
      >
        <aside
          className={`${props.className} relative z-40 flex-shrink-0 h-full overflow-y-auto custom-scrollbar pr-1`}
        >
          <div className="flex h-16 gap-4 items-center w-full justify-between pr-2 bg-light-darker">
            {/* <!-- TITLE --> */}
            <Link
              className="ml-8 text-lg font-bold text-primary z-50 flex items-center gap-2"
              href="/"
            >
              <Image src="/logo.webp" alt="" width={30} height={30} />

              {metadata.title}
            </Link>
            <button
              className="btn-tiny"
              aria-label="Menu"
              onClick={() => setOpen(!isOpen)}
            >
              {/*<Bars2Icon className="w-5 h-5" aria-hidden="true" />*/}
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-2">{props.children}</div>
        </aside>
      </Transition>
    </>
  );
}

export default SidebarHandler;
