import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavigationalBar from "@/components/Navigation/NavigationalBar";
import React, { Suspense } from "react";
import AuthContext from "@/components/Auth/AuthContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import NextTopLoader from "nextjs-toploader";

const primaryFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

interface IProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: IProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={primaryFont.className}>
      <body className="custom-scrollbar">
        <NextTopLoader color="var(--color-primary)" showSpinner={false} />
        <AuthContext>
          <div className="flex flex-col flex-1 w-full">
            <div className="w-full h-screen">{children}</div>
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
