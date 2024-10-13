"use client";
import { Login } from "@/src/shared/api/auth";
import { useLocation } from "@/src/shared/hooks";
import { Button, Error, Input } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie, setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
  const { router } = useLocation();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
    onSuccess: (data) => {
      setCookie("token", data.token, { maxAge: 3600 });
      if (getValues("username") == "root") {
        setCookie("role", "admin", { maxAge: 3600 });
        router.push("/structure");
        return;
      }
      setCookie("role", "base");
      router.push(`/prof/${btoa(getValues("username"))}?type=about`);
    },
  });
  const t = useTranslations("login");
  const tGlobal = useTranslations();
  const onSubmit = (data: { username: string; password: string }) => {
    mutate(data);
    deleteCookie("role");
    deleteCookie("token");
  };
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<{
    username: string;
    password: string;
  }>();
  return (
    <form
      className="bg-slate-50 flex min-w-LoginForm flex-col gap-4 border border-slate-200 rounded-sm py-10 px-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl ">{t("title")}</h1>
      <Input
        error={errors["username"]?.message}
        {...register("username", { required: tGlobal("forms.required") })}
        placeholder={t("form.login")}
      />
      <Input
        error={errors["password"]?.message}
        {...register("password", { required: tGlobal("forms.required") })}
        placeholder={t("form.password")}
      />
      {isError && <Error>{t("form.error")}</Error>}
      <Button disabled={isPending}>{t("form.btn")}</Button>
    </form>
  );
};
