"use client";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  Select as SelectUI,
  SelectValue,
} from "@/src/shared/ui";
import { Label } from "./label";
interface SelectProps {
  value: any;
  onChange: (...event: any[]) => void;
  label: string;
  content: any[];
}
export const Select = ({ value, onChange, label, content }: SelectProps) => {
  return (
    <div className="flex  flex-col gap-2">
      <Label className="text-md ">{label}</Label>
      <SelectUI onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {content.map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectUI>
    </div>
  );
};
