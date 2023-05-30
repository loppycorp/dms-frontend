"use client";

import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();

  if (session) {
    console.log(session);
  }

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">
          Content will be displayed here
        </p>
        <p className="mt-2 text-base leading-7 text-gray-600">
          Start by selecting a <b>menu</b> item
        </p>
      </div>
    </main>
  );
}
