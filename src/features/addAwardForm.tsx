"use client";
import { Button, Input, SelectInput } from "@/src/shared/ui";
import { Label } from "@/src/shared/ui/label";
import { AwardsTable } from "@/src/widgets";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
type FormFields = {
  award_type: string;
  award_date: Date;
};
export const AddAwardForm = () => {
  const t = useTranslations();
  const [awards, setAwards] = useState<Array<FormFields>>([]);
  const { register, handleSubmit, control } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    setAwards([...awards, data]);
  };

  return (
    <section className="p-3 rounded-md bg-slate-50 border border-slate-300 ">
      <h1 className="text-xl ">{t("addAwardForm.title")}</h1>
      <form
        className="flex flex-row  items-end gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name={"award_type"}
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col gap-2">
              <Label className="text-md">{t("addAwardForm.award.label")}</Label>
              <SelectInput
                value={value}
                select={t.raw("addAwardForm.award")}
                onChange={onChange}
              />
            </div>
          )}
        />
        <Input
          placeholder={t("addAwardForm.date")}
          type={"date"}
          {...register("award_date")}
        />
        <Button className="">{t("addAwardForm.btn")}</Button>
      </form>
      <section className="bg-white ml-3 rounded-md border border-slate-200 mt-3">
        <AwardsTable awards={awards} />
      </section>
    </section>
  );
};
