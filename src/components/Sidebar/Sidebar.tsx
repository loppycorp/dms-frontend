import { fetchAPIFromCMS } from "@/lib/api";
import React from "react";
import SidebarHandler from "@/components/Sidebar/SidebarHandler";
import SidebarContent from "@/components/Sidebar/SidebarContent";
import { systemMenus } from "@/data/navigation";

const fetchMenus = async () => {
  const menuItemsRes = await fetchAPIFromCMS(
    "/menus/1",
    { populate: ["deep"], nested: true },
    { next: { revalidate: 3600 } }
  );
  const items: MenuItem = menuItemsRes.data;

  return items;
};

function Sidebar({ className }: { className?: string | null }) {
  return (
    <SidebarHandler className={className}>
      <SidebarContent menuItems={systemMenus} />
    </SidebarHandler>
  );
}

export default Sidebar;
