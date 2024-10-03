"use client";
import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/shared/ui";
import { Label } from "@/src/shared/ui/label";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type FormFields = Record<string, string>;
export const AddReportForm = () => {
  const t = useTranslations("addReportForm");
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
      <section className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name={"report_type"}
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
            </div>
          )}
        />
        <Input {...register("creator")} placeholder={t("creator")} />
        <Input
          type="file"
          {...register("document")}
          placeholder={t("document")}
        />
        <Input {...register("status")} placeholder={t("status")} />
        <Input
          type="date"
          {...register("creation_date")}
          placeholder={t("creation_date")}
        />
        <Input
          type="date"
          {...register("submission_date")}
          placeholder={t("submission_date")}
        />
        <Input
          type="date"
          {...register("acceptance_date")}
          placeholder={t("acceptance_date")}
        />
      </section>
      <Button>{t("btn")}</Button>
    </form>
  );
};
