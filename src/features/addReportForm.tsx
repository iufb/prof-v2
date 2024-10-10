"use client";
import { CreateReport } from "@/src/shared/api/reports";
import {
  Button,
  Error,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/ui";
import { Label } from "@/src/shared/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormFields = Record<string, string>;
export const AddReportForm = () => {
  const t = useTranslations("addReportForm");
  const tGlobal = useTranslations();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["addReport"],
    mutationFn: CreateReport,
  });
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    mutate(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex mx-5 text-lg md:mx-0 flex-col gap-4 p-4 bg-slate-100 border border-slate-300 rounded-sm"
    >
      <h1 className="text-3xl">{t("title")}</h1>
      <section className="grid grid-cols-2 gap-4">
        <Input
          error={errors["prof_id"]?.message}
          {...register("prof_id", { required: tGlobal("forms.required") })}
          placeholder={t("prof_id")}
        />

        <Controller
          control={control}
          name={"report_type"}
          rules={{ required: tGlobal("forms.required") }}
          render={({ field: { onChange, value } }) => (
            <div>
              <Label className="text-md">{t("report_type.label")}</Label>
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder={t("report_type.label")} />
                </SelectTrigger>
                <SelectContent>
                  {t.raw("report_type.values").map((value: string) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Error>{errors["report_type"]?.message}</Error>
            </div>
          )}
        />
        <Input
          error={errors["creator"]?.message}
          {...register("creator", { required: tGlobal("forms.required") })}
          placeholder={t("creator")}
        />
        <Input
          type="file"
          error={errors["document"]?.message}
          {...register("document", { required: tGlobal("forms.required") })}
          placeholder={t("document")}
        />
        <Input
          error={errors["status"]?.message}
          {...register("status", { required: tGlobal("forms.required") })}
          placeholder={t("status")}
        />
        <Input
          type="date"
          error={errors["creation_date"]?.message}
          {...register("creation_date", {
            required: tGlobal("forms.required"),
          })}
          placeholder={t("creation_date")}
        />
        <Input
          type="date"
          error={errors["submission_date"]?.message}
          {...register("submission_date", {
            required: tGlobal("forms.required"),
          })}
          placeholder={t("submission_date")}
        />
        <Input
          type="date"
          error={errors["acceptance_date"]?.message}
          {...register("acceptance_date", {
            required: tGlobal("forms.required"),
          })}
          placeholder={t("acceptance_date")}
        />
      </section>
      {isError && <Error>{tGlobal("forms.error")}</Error>}
      <Button disabled={isPending}>{t("btn")}</Button>
    </form>
  );
};
