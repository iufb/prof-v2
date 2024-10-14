"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { GetAllProf } from "@/src/shared/api/prof";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/shared/ui";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useTranslations } from "next-intl";

export function ProfNameSelect({
  value,
  onChange,
}: {
  value: any;
  onChange: (...event: any[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("profNameSelect");
  const { data: profs } = useQuery({
    queryKey: ["higher_union_org"],
    queryFn: async () => {
      const data: Record<string, string>[] = await GetAllProf();
      return data;
    },
  });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? profs?.find((p) => p.union_name === value)?.union_name
            : t("trigger")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full  p-0">
        <Command>
          <CommandInput placeholder={t("search")} />
          <CommandList>
            <CommandEmpty>{t("notFound")}</CommandEmpty>
            <CommandGroup>
              {profs?.map((prof) => (
                <CommandItem
                  key={prof.bin}
                  value={prof.union_name}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={clsx(
                      "mr-2 h-4 w-4",
                      value === prof.union_name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {prof.union_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
