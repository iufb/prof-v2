"use client";
import { AddAwardForm } from "@/src/features/addAwardForm";
import { AddVacationForm } from "@/src/features/addVacationForm";
import { CreateWorker } from "@/src/shared/api/worker";
import { useLocation } from "@/src/shared/hooks";
import { queryClient } from "@/src/shared/lib/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Error,
  Input,
  Select,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/ui";
import { Label } from "@/src/shared/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
export const AddWorkerForm = () => {
  const t = useTranslations("addWorkerForm");
  const tGlobal = useTranslations();
  const { router, pathname, changeSearchParam, params } = useLocation();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["addWorker"],
    mutationFn: CreateWorker,
    onSuccess: (data) => {
      router.push(`${pathname}/${changeSearchParam("id", data.id)}`);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [`profApparatus ${params.id}`],
      });
    },
  });

  const inputs: string[] = t.raw("inputs");
  const [show, setShow] = useState(false);
  const selects: { label: string; values: string[] }[] = t.raw("selects");
  const dates: string[] = t.raw("dates");
  const files: string[] = t.raw("files");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (params.id) {
      mutateAsync({ ...data, prof_id: params.id as string }).then(() => {
        setShow(true);
      });
    }
  };
  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" max-h-[calc(80vh)] overflow-auto flex  mx-5 text-lg md:mx-0 flex-col gap-4 p-4 bg-slate-100 border border-slate-300 rounded-sm"
      >
        <h1 className="text-3xl">{t("title")}</h1>
        <section className="grid grid-cols-2 gap-4">
          {files.map((file, idx) => (
            <Controller
              key={file}
              control={control}
              name={fileKeys[idx]}
              rules={{ required: tGlobal("forms.required") }}
              render={({ field: { onChange, value } }) => (
                <Input
                  error={errors[fileKeys[idx]]?.message}
                  placeholder={file}
                  type="file"
                  onChange={onChange}
                  value={value}
                />
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
          {selects.map((select, idx) => (
            <Controller
              key={select.label}
              control={control}
              rules={{ required: tGlobal("forms.required") }}
              name={selectKeys[idx]}
              render={({ field: { onChange, value } }) => (
                <div>
                  {selectKeys[idx] == "position" ? (
                    <SelectInput
                      value={value}
                      onChange={onChange}
                      select={select}
                    />
                  ) : (
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
                    </div>
                  )}
                  <Error>{errors[selectKeys[idx]]?.message}</Error>
                </div>
              )}
            />
          ))}

          {dates.map((date, idx) => (
            <Controller
              key={date}
              control={control}
              name={dateKeys[idx]}
              rules={{ required: tGlobal("forms.required") }}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col gap-3">
                  <Label className="text-md" htmlFor={date}>
                    {date}
                  </Label>
                  <Input
                    id={date}
                    type="date"
                    value={value}
                    onChange={onChange}
                  />
                  <Error>{errors[dateKeys[idx]]?.message}</Error>
                </div>
              )}
            />
          ))}
        </section>
        {isError && <Error>{tGlobal("forms.error")}</Error>}
        <Button disabled={isPending}>{t("btn")}</Button>
      </form>
      <Dialog open={show} onOpenChange={() => setShow(!show)}>
        <DialogContent className="min-w-[49vw] bg-white">
          <DialogHeader>
            <DialogTitle>{t("addictionalData.title")}</DialogTitle>
            <DialogDescription className="w-full">
              {t("addictionalData.desc")}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <AddAwardForm />
            <AddVacationForm />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
const dateKeys = [
  "birth_date",
  "total_work_experience",
  "org_work_experience ",
  "union_membership_date",
];
const selectKeys = ["gender", "position", "role", "education"];
const fileKeys = ["photo"];
const inputKeys = ["name", "union_ticket_number", "phone", "email"];

type FormFields = Record<string, string>;
