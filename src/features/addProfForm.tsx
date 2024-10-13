"use client";

import { useToast } from "@/hooks/use-toast";
import { CreateProf } from "@/src/shared/api/prof";
import { useLocation } from "@/src/shared/hooks";
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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
export const AddProfForm = () => {
  const t = useTranslations("profForm");
  const tGlobal = useTranslations();
  const { toast } = useToast();
  const { router } = useLocation();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["addProf"],
    mutationFn: CreateProf,
    onSuccess: (data) => {
      toast({
        title: tGlobal("toast.create"),
      });
      router.push(`prof/${data.bin}?type=about`);
    },
    onError: () => {
      toast({ title: tGlobal("toast.error") });
    },
  });
  const inputs: string[] = t.raw("inputs");
  const selects: { label: string; values: string[] }[] = t.raw("selects");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    mutate(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex mx-5 text-lg md:mx-0 flex-col gap-4 p-4 bg-slate-100 border border-slate-300 rounded-sm"
    >
      <h1 className="text-3xl">{t("add.title")}</h1>
      <section className="grid grid-cols-2 gap-3">
        {selects.map((select, idx) => (
          <Controller
            key={select.label}
            control={control}
            rules={{ required: tGlobal("forms.required") }}
            name={selectKeys[idx]}
            render={({ field: { onChange, value } }) => (
              <div className="flex  flex-col gap-2">
                <Label className="text-md ">{select.label}</Label>
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
                <Error>{errors[selectKeys[idx]]?.message}</Error>
              </div>
            )}
          />
        ))}
        {inputs.map((input, idx) => (
          <Input
            {...register(inputKeys[idx], {
              required: tGlobal("forms.required"),
            })}
            error={errors[inputKeys[idx]]?.message}
            key={input}
            placeholder={input}
          />
        ))}
      </section>

      {isError && <Error>{tGlobal("forms.error")}</Error>}
      <Button disabled={isPending}>{t("add.btn")}</Button>
    </form>
  );
};
const selectKeys = [
  "industry", // Отрасль (наименование отрасли)
  "union_type", // Тип Профсоюза
  "higher_union_org", // Вышестоящая профсоюзная организация
];

const inputKeys = [
  "union_name", // Наименование Профсоюза
  "bin", // БИН (12 символов)
  "addres", // Адрес (область, индекс, город, район, улица, дом, офис)
  "phone", // Телефон
  "website", // Сайт
  "email", // e-mail
  "chairman_name", // Председатель (ФИО руководителя)
];
type FormFields = Record<string, string>;
