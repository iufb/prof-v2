"use client";
import { CreateAward } from "@/src/shared/api/awards";
import { useLocation, usePermission } from "@/src/shared/hooks";
import { queryClient } from "@/src/shared/lib/client";
import { Award } from "@/src/shared/lib/types";
import { Button, Error, Input, SelectInput } from "@/src/shared/ui";
import { AwardsTable } from "@/src/widgets";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
export const AddAwardForm = ({ id }: { id?: string }) => {
  const t = useTranslations();
  const { getSearchParam } = useLocation();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["addAward"],
    mutationFn: CreateAward,
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [`getAwards ${id}`],
      });
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Award>();
  const onSubmit: SubmitHandler<Award> = (data) => {
    mutate({ ...data, prof_memeber_id: id ?? getSearchParam("id") });
  };
  const { isAdmin } = usePermission();

  return (
    <section className="p-3 rounded-md w-full   bg-slate-50 border border-slate-300 ">
      <h1 className="text-xl ">{t("addAwardForm.title")}</h1>
      {isAdmin && (
        <>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <section className=" flex flex-col    gap-4">
              <Controller
                control={control}
                name={"award_type"}
                rules={{ required: t("forms.required") }}
                render={({ field: { onChange, value } }) => (
                  <div className="flex flex-col gap-2  ">
                    <SelectInput
                      value={value}
                      error={errors["award_type"]?.message}
                      select={t.raw("addAwardForm.award")}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
              <Input
                placeholder={t("addAwardForm.date")}
                type={"date"}
                error={errors["award_date"]?.message}
                {...register("award_date", { required: t("forms.required") })}
              />

              <div className="flex items-center">
                <Button disabled={isPending} className="w-full">
                  {t("addAwardForm.btn")}
                </Button>
              </div>
            </section>

            {isError && <Error>{t("forms.error")}</Error>}
          </form>
        </>
      )}
      <section className="bg-white ml-3 rounded-md border border-slate-200 mt-3">
        <AwardsTable id={id} />
      </section>
    </section>
  );
};
