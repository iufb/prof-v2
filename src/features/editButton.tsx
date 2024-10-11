"use client";
import { usePermission } from "@/src/shared/hooks";
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
  editForm: ReactNode;
  label: string;
  className?: string;
}
export const EditButton = ({ editForm, label, className }: EditButtonProps) => {
  const t = useTranslations("editBtn");
  const { isAdmin } = usePermission();
  if (!isAdmin) return <></>;
  return (
    <Dialog>
      <DialogTrigger
        className={clsx(
          "py-2 px-3 font-bold h-fit   rounded-md bg-gray-950 text-white text-sm hover:opacity-70",
          className,
        )}
      >
        {t("title")} {label}
      </DialogTrigger>
      <DialogContent className="min-w-[55vw] bg-white">
        <DialogHeader>
          <DialogTitle>
            {t("title")} {label}
          </DialogTitle>
          <DialogDescription className="w-full">
            {t("desc")} {label}
          </DialogDescription>
        </DialogHeader>
        <div>{editForm}</div>
      </DialogContent>
    </Dialog>
  );
};
