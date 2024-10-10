import { ReactNode } from "react";

export const NotFound = ({ children }: { children: ReactNode }) => {
  return <span className="text-md px-4 text-gray-500">{children}</span>;
};
