"use client";

import {
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/shared/ui";
import { Label } from "@/src/shared/ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";
interface SelectInputProps {
  value: string;
  error?: string;
  select: { label: string; values: string[] };
  onChange: (...event: any) => void;
}
export const SelectInput = ({
  error,
  value,
  select,
  onChange,
}: SelectInputProps) => {
  const [other, setOther] = useState(false);
  const t = useTranslations("");
  return (
    <>
      {other ? (
        <div className="relative">
          <button
            onClick={() => setOther(false)}
            className="absolute right-0 cursor-pointer  text-sm text-start text-slate-400"
          >
            {t("change")}
          </button>
          <Input placeholder={select.label} value={value} onChange={onChange} />
        </div>
      ) : (
        <div className="flex  flex-col gap-2">
          <Label className="text-md ">{select.label}</Label>
          <Select
            onValueChange={(value) => {
              if (value == select.values[select.values.length - 1]) {
                setOther(true);
              }
              onChange(value);
            }}
            value={value}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder={select.label} />
            </SelectTrigger>
            <SelectContent>
              {select.values.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {error && <span className="error ">{error}</span>}
    </>
  );
};
