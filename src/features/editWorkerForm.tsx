"use client";
import { PatchWorker } from "@/src/shared/api/worker";
import { queryClient } from "@/src/shared/lib/client";
import {
  Button,
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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
export const EditWorkerForm = ({
  workerData,
}: {
  workerData: Record<string, string>;
}) => {
  console.log(workerData);

  const t = useTranslations("workerForm");
  const tGlobal = useTranslations();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["editWorker"],
    mutationFn: PatchWorker,
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [`worker ${workerData.id}`],
      });
    },
  });

  const inputs: string[] = t.raw("inputs");
  const selects: { label: string; values: string[] }[] = t.raw("selects");
  const dates: string[] = t.raw("dates");
  const files: string[] = t.raw("files");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({ defaultValues: workerData });
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutate({ body: data, id: workerData.id });
  };
  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" max-h-[calc(80vh)] overflow-auto flex  mx-5 text-lg md:mx-0 flex-col gap-4 p-4 bg-slate-100 border border-slate-300 rounded-sm"
      >
        <h1 className="text-3xl">{t("edit.title")}</h1>
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
        <Button disabled={isPending}>{t("edit.btn")}</Button>
      </form>
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
