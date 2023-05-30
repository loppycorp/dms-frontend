import Sidebar from "@/components/Sidebar/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";
import { metadata } from "@/data/metadata";
import NavigationalBar from "@/components/Navigation/NavigationalBar";
import React from "react";
import SystemNavigationalBar from "@/components/Navigation/SystemNavigationalBar";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex relative h-full w-full">
      {/* @ts-expect-error Async Server Component */}
      <Sidebar className="w-full lg:w-1/3 xl:w-1/5" />
      <div className="flex flex-col w-full h-full relative overflow-y-auto custom-scrollbar-page">
        <SystemNavigationalBar session={session} />
        {session ? (
          children
        ) : (
          <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="flex items-center flex-col text-center gap-2">
              <p className="text-base font-semibold text-primary">
                {metadata.title} System
              </p>
              <p className="mt-2 text-base leading-7 text-gray-600">
                <b>Authentication</b> is required to access this page.
              </p>
              <Link href="/login" className="btn-primary">
                Click here to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Layout;
