"use client";
import { UploadWithExcell } from "@/src/shared/api/worker";
import { queryClient } from "@/src/shared/lib/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Error,
  Input,
} from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { File } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export const AddWorkersByFile = () => {
  const bin = useParams().id;
  const t = useTranslations("workerForm");
  const tGlobal = useTranslations("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["file workers"],
    mutationFn: UploadWithExcell,
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [`profApparatus ${bin}`],
      });
    },
  });
  const onSubmin: SubmitHandler<Record<string, any>> = (data) => {
    mutate({ body: { file: data.file[0] }, bin: bin as string });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <File />
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{t("file.title")}</DialogTitle>
          <DialogDescription>
            {t.rich("file.about", {
              a: (chunk) => (
                <a
                  className="underline text-slate-700"
                  target="_blank"
                  href="https://docs.google.com/spreadsheets/d/1o5xDX1o7mqsswejYJJdU9tUekX0UQGjJ/edit?usp=sharing&ouid=114079707167663728470&rtpof=true&sd=true"
                >
                  {chunk}
                </a>
              ),
            })}
          </DialogDescription>
        </DialogHeader>
        <div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmin)}
          >
            <Input
              type="file"
              placeholder={t("file.file")}
              error={errors["root"]?.message}
              accept=".xls,.xlsx"
              {...register("file", { required: tGlobal("forms.required") })}
            />
            {isError && <Error>{t("file.error")}</Error>}
            <Button disabled={isPending}>{t("file.btn")}</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
