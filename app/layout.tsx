"use client"; // Next.js 13+ app router için client component

import { SessionProvider, useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {


  return (
    <>
      <html lang="en">
        <body>
          <SessionProvider>
            <Navbar />
            <main>{children}</main>
          </SessionProvider>
        </body>
      </html>
    </>
  );
}
