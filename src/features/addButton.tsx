"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/ui";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
interface EditButtonProps {
  addForm: ReactNode;
  label: string;
  className?: string;
}
export const AddButton = ({ addForm, label, className }: EditButtonProps) => {
  const t = useTranslations("addBtn");
  return (
    <Dialog>
      <DialogTrigger
        className={clsx(
          "py-2 px-3 font-bold   rounded-md bg-gray-950 text-white text-sm hover:opacity-70",
          className,
        )}
      >
        {t("title")} {label}
      </DialogTrigger>
      <DialogContent className="min-w-[55vw]  bg-white">
        <DialogHeader>
          <DialogTitle>
            {t("title")} {label}
          </DialogTitle>
          <DialogDescription className="w-full">
            {t("desc")} {label}
          </DialogDescription>
        </DialogHeader>
        <div>{addForm}</div>
      </DialogContent>
    </Dialog>
  );
};
