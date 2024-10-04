"use client";
import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectInput,
} from "@/src/shared/ui";
import { Label } from "@/src/shared/ui/label";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type FormFields = Record<string, string>;
export const AddProfCollegiateBodiesForm = () => {
  const t = useTranslations("addProfCollegiateBodiesForm");
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
          name={"body_type"}
          render={({ field: { onChange, value } }) => (
            <div>
              <Label className="text-md">{t("body_type.label")}</Label>
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder={t("body_type.label")} />
                </SelectTrigger>
                <SelectContent>
                  {t.raw("body_type.values").map((value: string) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <Input {...register("name")} placeholder={t("name")} />
        <Input
          {...register("union_ticket_number")}
          placeholder={t("union_ticket_number")}
        />
        <Controller
          control={control}
          name={"position"}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              value={value}
              onChange={onChange}
              select={t.raw("position")}
            />
          )}
        />
        <Controller
          control={control}
          name={"role"}
          render={({ field: { onChange, value } }) => (
            <div>
              <Label className="text-md">{t("role.label")}</Label>
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder={t("role.label")} />
                </SelectTrigger>
                <SelectContent>
                  {t.raw("role.values").map((value: string) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </section>
      <Button>{t("btn")}</Button>
    </form>
  );
};
