"use client";
import { CreateVacation } from "@/src/shared/api/vacations";
import { useLocation } from "@/src/shared/hooks";
import { queryClient } from "@/src/shared/lib/client";
import { Vacation } from "@/src/shared/lib/types";
import { Button, Error, Input, SelectInput } from "@/src/shared/ui";
import { VacationsTable } from "@/src/widgets";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const AddVacationForm = () => {
  const t = useTranslations("addVacationForm");
  const tGlobal = useTranslations();
  const { getSearchParam } = useLocation();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["addVacation"],
    mutationFn: CreateVacation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getVacations"] });
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Vacation>();
  const onSubmit: SubmitHandler<Vacation> = (data) => {
    mutate({ ...data, prof_memeber_id: getSearchParam("id") });
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
          rules={{ required: tGlobal("forms.required") }}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              error={errors["sanatorium"]?.message}
              value={value}
              onChange={onChange}
              select={t.raw("addVacationForm.vacation.values")}
            />
          )}
        />
        <Input
          placeholder={t("date")}
          type={"date"}
          error={errors["vacation_date"]?.message}
          {...register("vacation_date", {
            required: tGlobal("forms.required"),
          })}
        />
        <Button disabled={isPending} className="">
          {t("btn")}
        </Button>
        {isError && <Error>{t("forms.error")}</Error>}
      </form>
      <section className="bg-white ml-3 rounded-md border border-slate-200 mt-3">
        <VacationsTable />
      </section>
    </section>
  );
};
