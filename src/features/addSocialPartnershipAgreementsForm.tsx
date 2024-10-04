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
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormFields = Record<string, string>;
export const AddSocialPartnershipAgreementsForm = () => {
  const t = useTranslations("addSocialPartnershipAgreementsForm");
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
      <section className="grid  gap-4">
        <Controller
          control={control}
          name={"agreement_type"}
          render={({ field: { onChange, value } }) => (
            <div>
              <Label className="text-md">{t("agreement_type.label")}</Label>
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder={t("agreement_type.label")} />
                </SelectTrigger>
                <SelectContent>
                  {t.raw("agreement_type.values").map((value: string) => (
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
          type="date"
          {...register("start_date")}
          placeholder={t("start_date")}
        />
        <Input
          type="date"
          {...register("end_date")}
          placeholder={t("end_date")}
        />
      </section>
      <Button>{t("btn")}</Button>
    </form>
  );
};
