"use client";
import { useToast } from "@/hooks/use-toast";
import { CreatePartnership } from "@/src/shared/api/partners";
import { queryClient } from "@/src/shared/lib/client";
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
import { useParams } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormFields = Record<string, string>;
export const AddSocialPartnershipAgreementsForm = () => {
  const id = atob(useParams().id);
  const t = useTranslations("addSocialPartnershipAgreementsForm");
  const tGlobal = useTranslations();
  const { toast } = useToast();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: [`partnership ${id}`],
    mutationFn: CreatePartnership,
    onSuccess: () => {
      toast({ title: tGlobal("toast.create") });
    },
    onError: () => {
      toast({ title: tGlobal("toast.error") });
    },

    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [`GetPartnerships ${id}`],
      });
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutate({ ...data, prof_id: id as string });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex mx-5 text-lg md:mx-0 flex-col gap-4 p-4 bg-slate-100 border border-slate-300 rounded-sm"
    >
      <section className="grid  gap-4">
        <Controller
          control={control}
          name={"agreement_type"}
          rules={{ required: tGlobal("forms.required") }}
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
              <Error>{errors["agreement_type"]?.message}</Error>
            </div>
          )}
        />
        <Input
          type="date"
          error={errors["start_date"]?.message}
          {...register("start_date", { required: tGlobal("forms.required") })}
          placeholder={t("start_date")}
        />
        <Input
          type="date"
          error={errors["end_date"]?.message}
          {...register("end_date", { required: tGlobal("forms.required") })}
          placeholder={t("end_date")}
        />
      </section>
      {isError && <Error>{tGlobal("forms.error")}</Error>}
      <Button disabled={isPending}>{t("btn")}</Button>
    </form>
  );
};
