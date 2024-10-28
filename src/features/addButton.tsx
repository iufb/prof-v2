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
import { ReactNode, useEffect, useState } from "react";
interface EditButtonProps {
  showTitle?: boolean;
  addForm: ReactNode;
  label: string;
  className?: string;
}
export const AddButton = ({
  showTitle = true,
  addForm,
  label,
  className,
}: EditButtonProps) => {
  const t = useTranslations("addBtn");
  const { isAdmin } = usePermission();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return <></>;
  if (!isAdmin) return <></>;
  return (
    <Dialog>
      <DialogTrigger
        className={clsx(
          "py-2 px-3 mb-2 font-bold   rounded-md bg-gray-950 text-white text-sm hover:opacity-70",
          className,
        )}
      >
        {showTitle && t("title")} {label}
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
        {addForm}
      </DialogContent>
    </Dialog>
  );
};
