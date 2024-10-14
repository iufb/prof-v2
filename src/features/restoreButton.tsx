"use client";
import { RestorePass } from "@/src/shared/api/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Error,
  Loader,
} from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export const RestoreButton = ({
  id,
  setPass,
}: {
  id: string;
  setPass: (pass: string) => void;
}) => {
  const t = useTranslations("restore");
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["restore"],
    mutationFn: RestorePass,
    onSuccess: (data) => {
      setPass(data.success.slice(-8));
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-black  underline underline-offset-4">
        {t("trigger")}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("desc")}</AlertDialogDescription>
        </AlertDialogHeader>
        {isPending && <Loader />}
        {isError && <Error>{t("error")}</Error>}
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction type="button" onClick={() => mutate(id)}>
            {t("continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
