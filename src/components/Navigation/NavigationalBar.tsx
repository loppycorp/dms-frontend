import Link from "next/link";
import LoginButton from "@/components/Auth/LoginButton";
import { Session } from "next-auth";
import { metadata } from "@/data/metadata";
import Image from "next/image";

export default function NavigationalBar(props: { session?: Session | null }) {
  return (
    <div className="absolute w-full top-0 py-4 h-16 z-50 flex items-center justify-between px-6 mx-auto text-primary">
      {/* <!-- TITLE --> */}
      <Link
        className="ml-2 text-lg font-bold text-primary z-50 flex items-center gap-2"
        href="/"
      >
        <Image src="/logo.png" alt="" width={30} height={30} />
        {metadata.title}
      </Link>

      {/*TODO: Implement Search here*/}
      <LoginButton isLoggedIn={!!props.session} />
    </div>
  );
}
