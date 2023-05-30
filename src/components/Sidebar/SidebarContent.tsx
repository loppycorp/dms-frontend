"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function SidebarContent(props: { menuItems: MenuItem }) {
  const pathName = usePathname();
  const menus = props.menuItems.items;
  const rootSlug = props.menuItems.slug;

  function getFullPath(menuItem: string, childItem: string): string {
    return getPath(menuItem).concat(childItem);
  }

  function getPath(menuItem: string): string {
    return "/" + rootSlug.concat(menuItem);
  }

  const navItems = menus.map((menuItem) =>
    menuItem.children.length > 0 ? (
      <details className="group" key={menuItem.id} open={false}>
        <summary className="group flex justify-between pl-8 pr-4 py-3 items-center w-full text-sm font-semibold hover:bg-light">
          <span>{menuItem.title}</span>
          <ChevronDownIcon className="w-4 group-open:-rotate-180" />
        </summary>
        <nav
          className="overflow-hidden text-sm shadow-inner bg-light-darker rounded-r-2xl"
          aria-label="submenu"
        >
          {menuItem.children.map((r) => (
            <Link
              key={r.id}
              href={getFullPath(menuItem.url, r.url)}
              className={`flex pl-8 py-3 items-center w-full text-sm hover:bg-light ${
                pathName == getFullPath(menuItem.url, r.url) &&
                "bg-primary font-semibold text-light hover:bg-primary-dark"
              }`}
            >
              <span className="ml-4">{r.title}</span>
            </Link>
          ))}
        </nav>
      </details>
    ) : (
      <li className="relative" key={menuItem.id}>
        <Link
          href={getPath(menuItem.url)}
          className={`flex px-6 py-3 items-center w-full text-sm font-semibold hover:bg-light ${
            pathName == getPath(menuItem.url) && "bg-light pointer-events-none"
          }`}
        >
          {pathName == getPath(menuItem.url) && (
            <span
              className="absolute inset-y-0 left-0 w-1 bg-primary rodunded-tr-lg rounded-br-lg"
              aria-hidden="true"
            ></span>
          )}
          <span className="ml-4">{menuItem.title}</span>
        </Link>
      </li>
    )
  );

  return (
    <nav className="text-primary-dark">
      <ul>{navItems}</ul>
    </nav>
  );
}

export default SidebarContent;
