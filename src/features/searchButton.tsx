import { SearchWorker } from "@/src/features/SearchWorker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/ui";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export const SearchButton = () => {
  const t = useTranslations("search");
  return (
    <Dialog>
      <DialogTrigger>
        <Search />
      </DialogTrigger>
      <DialogContent className="bg-white min-h-[calc(100vh-4rem)] min-w-[70rem]">
        <DialogHeader>
          <DialogTitle>{t("search")}</DialogTitle>
          <DialogDescription>{t("desc")}</DialogDescription>
        </DialogHeader>
        <SearchWorker />
      </DialogContent>
    </Dialog>
  );
};
