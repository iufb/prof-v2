import { ReactNode } from "react";

export const NotFound = ({ children }: { children: ReactNode }) => {
  return <span className="text-md text-slte-300">{children}</span>;
};
