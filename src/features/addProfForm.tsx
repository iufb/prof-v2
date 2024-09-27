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
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
export const AddProfForm = () => {
  const t = useTranslations("addProfForm");
  const inputs: string[] = t.raw("inputs");
  const selects: { label: string; values: string[] }[] = t.raw("selects");
  const { register, handleSubmit, control } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex mx-5 text-lg md:mx-0 flex-col gap-4 p-4 bg-slate-100 border border-slate-300 rounded-sm"
    >
      <h1 className="text-3xl">{t("title")}</h1>
      {selects.map((select, idx) => (
        <Controller
          key={select.label}
          control={control}
          name={selectKeys[idx]}
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={onChange} value={value}>
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
          )}
        />
      ))}
      {inputs.map((input, idx) => (
        <Input {...register(inputKeys[idx])} key={input} placeholder={input} />
      ))}

      <Button>{t("btn")}</Button>
    </form>
  );
};
const selectKeys = [
  "industry", // Отрасль (наименование отрасли)
  "union_type", // Тип Профсоюза
];

const inputKeys = [
  "higher_union_org", // Вышестоящая профсоюзная организация
  "union_name", // Наименование Профсоюза
  "BIN", // БИН (12 символов)
  "address", // Адрес (область, индекс, город, район, улица, дом, офис)
  "phone", // Телефон
  "website", // Сайт
  "email", // e-mail
  "chairman_name", // Председатель (ФИО руководителя)
];
type FormFields = Record<string, string>;
