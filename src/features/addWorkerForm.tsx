"use client";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/ui";
import { Label } from "@/src/shared/ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
export const AddWorkerForm = () => {
  const t = useTranslations("addWorkerForm");
  const inputs: string[] = t.raw("inputs");
  const selects: { label: string; values: string[] }[] = t.raw("selects");
  const dates: string[] = t.raw("dates");
  const files: string[] = t.raw("files");
  const [position, setPosition] = useState(false);
  const { register, handleSubmit, control } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex md:max-w-[30vw] mx-5 text-lg md:mx-0 flex-col gap-4 p-4 bg-slate-100 border border-slate-300 rounded-sm"
    >
      <h1 className="text-3xl">{t("title")}</h1>
      {files.map((file, idx) => (
        <Controller
          key={file}
          control={control}
          name={fileKeys[idx]}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder={file}
              type="file"
              onChange={onChange}
              value={value}
            />
          )}
        />
      ))}

      {inputs.map((input, idx) => (
        <Input {...register(inputKeys[idx])} key={input} placeholder={input} />
      ))}
      {selects.map((select, idx) => (
        <Controller
          key={select.label}
          control={control}
          name={selectKeys[idx]}
          render={({ field: { onChange, value } }) =>
            selectKeys[idx] == "position" && position ? (
              <div className="relative">
                <button
                  onClick={() => setPosition(false)}
                  className="absolute right-0 cursor-pointer  text-sm text-start text-slate-400"
                >
                  {t("change")}
                </button>
                <Input
                  placeholder={select.label}
                  value={value}
                  onChange={onChange}
                />
              </div>
            ) : (
              <Select
                onValueChange={(value) => {
                  if (value == select.values[select.values.length - 1]) {
                    setPosition(true);
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
            )
          }
        />
      ))}

      {dates.map((date, idx) => (
        <Controller
          key={date}
          control={control}
          name={dateKeys[idx]}
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col gap-3">
              <Label htmlFor={date}>{date}</Label>
              <Input id={date} type="date" value={value} onChange={onChange} />
            </div>
          )}
        />
      ))}

      <Button>{t("btn")}</Button>
    </form>
  );
};
const dateKeys = [
  "birth_date",
  "total_work_experience",
  "org_work_experience ",
  "union_membership_date",
];
const selectKeys = ["gender", "position", "role", "education"];
const fileKeys = ["photo"];
const inputKeys = ["name", "union_ticket_number", "phone", "email"];

type FormFields = Record<string, string>;
