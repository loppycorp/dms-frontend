"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  AcademicCapIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { Session } from "next-auth";

function SidebarContent(props: {
  menuItems: MenuLinkItem[];
  session: Session | null;
}) {
  const pathName = usePathname();
  const menus = props.menuItems;
  const rootSlug = "system";
  const role = props.session?.user?.data?.role;
  const hasAccess = (item: MenuLinkItem) => role && item.access?.includes(role);

  function getFullPath(menuItem: string, childItem: string): string {
    return getPath(menuItem).concat(childItem);
  }

  function getPath(menuItem: string): string {
    return "/" + rootSlug.concat(menuItem);
  }

  const navItems = menus.map((menuItem, index) =>
    hasAccess(menuItem) ? (
      menuItem.children && menuItem.children.length > 0 ? (
        <div key={index}>
          <div className="flex gap-3 pl-6 pr-4 py-3 items-center w-full text-sm font-semibold hover:bg-light">
            <Image src={menuItem.icon} alt="" width={20} height={20} />
            <span>{menuItem.title}</span>
          </div>
          <nav className="text-sm" aria-label="submenu">
            <ul>
              {menuItem.children.map((r, childIndex) => (
                <li key={childIndex} className="">
                  <Link
                    href={getFullPath(menuItem.url, r.url)}
                    className={`flex pl-8 py-1 items-center w-full text-sm hover:text-black ${
                      pathName == getFullPath(menuItem.url, r.url) &&
                      "font-medium text-black"
                    }`}
                  >
                    <span
                      className="text-2xl"
                      style={{ color: r.bullet_color }}
                    >
                      {"\u2022"}
                    </span>
                    <span className="ml-3">{r.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : (
        <li className="relative" key={index}>
          <Link
            href={getPath(menuItem.url)}
            className={`flex px-6 py-3 items-center w-full text-sm font-semibold hover:bg-light ${
              pathName == getPath(menuItem.url) &&
              "bg-light pointer-events-none"
            }`}
          >
            <Image
              src={
                pathName == getPath(menuItem.url)
                  ? menuItem.icon_active
                  : menuItem.icon
              }
              alt=""
              width={20}
              height={20}
            />
            <span
              className={`ml-3 ${
                pathName == getPath(menuItem.url) && "text-black font-bold"
              }`}
            >
              {menuItem.title}
            </span>
          </Link>
        </li>
      )
    ) : (
      <></>
    )
  );

  return (
    <nav className="text-gray-400">
      <ul>{navItems}</ul>
    </nav>
  );
}

export default SidebarContent;
