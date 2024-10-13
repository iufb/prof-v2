"use client";
import { CreatePass } from "@/src/shared/api/auth";
import { Button, Error, Input } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const CreatePassForm = () => {
  const t = useTranslations("createPassForm");
  const tGlobal = useTranslations();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["pass"],
    mutationFn: CreatePass,
    onSuccess: (data) => {
      setPass(data.password);
    },
  });

  const onSubmit = (data: { username: string }) => {
    setPass("");
    mutate(data);
  };
  const [pass, setPass] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{
    username: string;
  }>();
  return (
    <form
      className="bg-slate-50 flex min-w-LoginForm flex-col gap-4 border border-slate-200 rounded-sm py-10 px-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl ">{t("title")}</h1>
      <p className="text-md text-gray-400">{t("desc")}</p>
      <Input
        error={errors["username"]?.message}
        {...register("username", { required: tGlobal("forms.required") })}
        placeholder={t("form.login")}
      />
      {isError && <Error>{t("form.error")}</Error>}
      {pass && <span>{t("form.res", { pass })}</span>}
      <Button disabled={isPending}>{t("form.btn")}</Button>
    </form>
  );
};
