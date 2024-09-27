"use client";
import { Button, Input } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export const LoginForm = () => {
  const { mutate } = useMutation({ mutationKey: ["login"] });
  const t = useTranslations("login");
  const onSubmit = () => {
    mutate();
  };
  return (
    <form
      className="bg-slate-50 flex min-w-LoginForm flex-col gap-4 border border-slate-200 rounded-sm py-10 px-5"
      onSubmit={onSubmit}
    >
      <h1 className="text-3xl ">{t("title")}</h1>
      <Input placeholder={t("form.login")} />
      <Input placeholder={t("form.password")} />
      <Button>{t("form.btn")}</Button>
    </form>
  );
};
