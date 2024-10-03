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
import { VacationsTable } from "@/src/widgets";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
type FormFields = {
  sanatorium: string;
  vacation_date: Date;
};
export const AddVacationForm = () => {
  const t = useTranslations("addVacationForm");
  const [vacations, setVacations] = useState<Array<FormFields>>([]);
  const { register, handleSubmit, control } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    setVacations([...vacations, data]);
  };

  return (
    <section className="p-3 rounded-md bg-slate-50 border border-slate-300 ">
      <h1 className="text-xl ">{t("title")}</h1>
      <form
        className="flex flex-row  items-end gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name={"sanatorium"}
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col gap-2">
              <Label className="text-md">{t("vacation.label")}</Label>
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder={t("vacation.label")} />
                </SelectTrigger>
                <SelectContent>
                  {t.raw("vacation.values").map((value: string) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <Input
          placeholder={t("date")}
          type={"date"}
          {...register("vacation_date")}
        />
        <Button className="">{t("btn")}</Button>
      </form>
      <section className="bg-white ml-3 rounded-md border border-slate-200 mt-3">
        <VacationsTable vacations={vacations} />
      </section>
    </section>
  );
};
