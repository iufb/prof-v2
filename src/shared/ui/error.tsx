import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
interface ErrorProps extends ComponentProps<"span"> {
  children: ReactNode;
}
export const Error = ({ children, className, ...props }: ErrorProps) => {
  return (
    <span className={clsx("error", className)} {...props}>
      {children}
    </span>
  );
};
