import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/src/shared/ui/label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <div className="flex gap-2 flex-col">
        <Label className="text-md" htmlFor={props.placeholder}>
          {props.placeholder}
        </Label>
        <input
          id={props.placeholder}
          type={type}
          className={cn(
            "flex h-9  w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-white",
            className,
          )}
          ref={ref}
          {...props}
        />
        <span className="text-red-400 text-sm">{error}</span>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
