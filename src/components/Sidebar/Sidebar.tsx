import { fetchAPIFromCMS } from "@/lib/api";
import React from "react";
import SidebarHandler from "@/components/Sidebar/SidebarHandler";
import SidebarContent from "@/components/Sidebar/SidebarContent";
import { systemMenus } from "@/data/navigation";
import { Session } from "next-auth";

const fetchMenus = async () => {
  const menuItemsRes = await fetchAPIFromCMS(
    "/menus/1",
    { populate: ["deep"], nested: true },
    { next: { revalidate: 3600 } }
  );
  const items: MenuItem = menuItemsRes.data;

  return items;
};

function Sidebar({
  className,
  session,
}: {
  className?: string | null;
  session: Session | null;
}) {
  return (
    <SidebarHandler className={className}>
      <SidebarContent menuItems={systemMenus} session={session} />
    </SidebarHandler>
  );
}

export default Sidebar;
