import { fetchAPIFromCMS } from "@/lib/api";
import React from "react";
import SidebarHandler from "@/components/Sidebar/SidebarHandler";
import SidebarContent from "@/components/Sidebar/SidebarContent";

const fetchMenus = async () => {
  const menuItemsRes = await fetchAPIFromCMS(
    "/menus/1",
    { populate: ["deep"], nested: true },
    { next: { revalidate: 3600 } }
  );
  const items: MenuItem = menuItemsRes.data;

  return items;
};

async function Sidebar({ className }: { className?: string | null }) {
  const menuItems = await fetchMenus();

  return (
    <SidebarHandler className={className}>
      <SidebarContent menuItems={menuItems} />
    </SidebarHandler>
  );
}

export default Sidebar;
