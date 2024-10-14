"use client";
import { useToast } from "@/hooks/use-toast";
import { CreateCollegianBodies } from "@/src/shared/api/collegian-bodies";
import { queryClient } from "@/src/shared/lib/client";
import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectInput,
  Error,
} from "@/src/shared/ui";
import { Label } from "@/src/shared/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type FormFields = Record<string, string>;
export const AddProfCollegiateBodiesForm = () => {
  const t = useTranslations("addProfCollegiateBodiesForm");
  const id = useParams().id;
  const tGlobal = useTranslations();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>();
  const { toast } = useToast();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["createBodies"],
    mutationFn: CreateCollegianBodies,
    onSuccess: () => {
      toast({ title: tGlobal("toast.create") });
    },
    onError: () => {
      toast({ title: tGlobal("toast.error") });
    },

    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [`bodies ${id}`],
      });
    },
  });
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (id) mutate({ ...data, prof_id: id as string });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex mx-5 text-lg md:mx-0 flex-col gap-4 p-4 bg-slate-100 border border-slate-300 rounded-sm"
    >
      <section className="grid  gap-4">
        <Controller
          control={control}
          name={"body_type"}
          rules={{ required: tGlobal("forms.required") }}
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
              <Error>{errors["body_type"]?.message}</Error>
            </div>
          )}
        />
        <Input
          error={errors["name"]?.message}
          {...register("name", { required: tGlobal("forms.required") })}
          placeholder={t("name")}
        />
        <Input
          error={errors["union_ticket_number"]?.message}
          {...register("union_ticket_number", {
            required: tGlobal("forms.required"),
          })}
          placeholder={t("union_ticket_number")}
        />
        <Controller
          control={control}
          name={"position"}
          rules={{ required: tGlobal("forms.required") }}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              error={errors["position"]?.message}
              value={value}
              onChange={onChange}
              select={t.raw("position")}
            />
          )}
        />
        <Controller
          control={control}
          name={"role"}
          rules={{ required: tGlobal("forms.required") }}
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
              <Error>{errors["role"]?.message}</Error>
            </div>
          )}
        />
      </section>
      {isError && <Error>{tGlobal("forms.error")}</Error>}
      <Button disabled={isPending}>{t("btn")}</Button>
    </form>
  );
};
