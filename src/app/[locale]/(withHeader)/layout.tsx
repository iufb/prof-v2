import { Header } from "@/src/widgets";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const cookie = cookies();
  return (
    <>
      <Header
        id={cookie.get("id")?.value ?? ""}
        isAdmin={cookie.get("role")?.value == "admin"}
      />
      <main className="max-w-[87.5rem] mx-auto px-2 lg:px-0">{children}</main>
    </>
  );
}
