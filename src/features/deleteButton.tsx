"use client";
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
} from "@/src/shared/ui";
import { DeleteIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";

export const DeleteButton = ({ btn }: { btn: ReactNode }) => {
  const t = useTranslations("deleteBtn");
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
      <AlertDialogTrigger>
        <DeleteIcon />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("ausure")}</AlertDialogTitle>
          <AlertDialogDescription>{t("desc")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>{btn}</AlertDialogAction>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            {t("cancel")}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
