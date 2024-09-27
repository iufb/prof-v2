import { Header } from "@/src/widgets";
import { ReactNode } from "react";

export default function WithHeader({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
