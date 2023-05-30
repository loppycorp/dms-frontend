import React from "react";
import { Session } from "next-auth";
import ProfileMenu from "@/components/ProfileMenu";

function SystemNavigationalBar(props: { session: Session | null }) {
  return (
    <div className="absolute w-full left-0 top-0 py-4 h-20 z-50 flex items-center justify-end px-6 mx-auto text-primary pointer-events-none">
      <ProfileMenu session={props.session} />
    </div>
  );
}

export default SystemNavigationalBar;
