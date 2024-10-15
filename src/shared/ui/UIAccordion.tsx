"use client";

import { ComponentProps, ReactNode, useRef, useState } from "react";
interface UIAccordionProps extends ComponentProps<"section"> {
  trigger: string;
  content: ReactNode;
}
const UIAccordion = ({ trigger, content, ...props }: UIAccordionProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSelectElement>(null);

  return (
    <section {...props}>
      <button onClick={() => setOpen(!open)}>{trigger}</button>
      <section
        className={`overflow-hidden transition-all duration-500 ease-in-out`}
        style={{
          height: open ? `${ref?.current?.scrollHeight}px` : "0px",
        }}
        ref={ref}
      >
        {content}
      </section>
    </section>
  );
};
export { UIAccordion };
