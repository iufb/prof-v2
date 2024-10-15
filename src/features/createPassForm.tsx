"use client";
import { useToast } from "@/hooks/use-toast";
import { RestoreButton } from "@/src/features/restoreButton";
import { CreatePass } from "@/src/shared/api/auth";
import { Button, Error, Input, Loader } from "@/src/shared/ui";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const CreatePassForm = () => {
  const t = useTranslations("createPassForm");
  const tGlobal = useTranslations();
  const { mutate, isPending, error } = useMutation<any, { error: string }, any>(
    {
      mutationKey: ["pass"],
      mutationFn: CreatePass,
      onSuccess: (data) => {
        setPass(data.password);
      },
    },
  );
  const isMutating = useIsMutating({ mutationKey: ["restore"] });

  const onSubmit = (data: { username: string }) => {
    setPass("");
    mutate(data);
  };
  const [pass, setPass] = useState("");
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<{
    username: string;
  }>();
  const { toast } = useToast();
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
      {error && !pass && (
        <Error>
          {t("form.error")}
          {error.error == "User with this username already exists" ? (
            <div className="flex gap-2 items-center">
              <span>{t("form.exists")}</span>
              <RestoreButton setPass={setPass} id={getValues("username")} />
            </div>
          ) : (
            t("form.notFound")
          )}
        </Error>
      )}
      {isMutating ? (
        <Loader />
      ) : (
        pass && (
          <span className="px-3 rounded-md py-2 border border-slate-300 bg-slate-200">
            {t.rich("form.res", {
              pass: () => (
                <span
                  onClick={() => {
                    copyToClipboard(pass, () => {
                      toast({ title: t("alert") });
                    });
                  }}
                  className="cursor-pointer p-2 bg-black rounded-md border-slate-300 border text-white"
                >
                  {pass}
                </span>
              ),
            })}
          </span>
        )
      )}
      <Button disabled={isPending}>{t("form.btn")}</Button>
    </form>
  );
};

const copyToClipboard = (text: string, alert: () => void) => {
  navigator.clipboard.writeText(text);
  alert();
};
