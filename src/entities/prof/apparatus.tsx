"use client";
import {
  AddButton,
  AddWorkerForm,
  AddWorkersByFile,
  SearchButton,
} from "@/src/features";
import { GetWorkersByBin } from "@/src/shared/api/worker";
import { Link } from "@/src/shared/config/routing";
import { usePermission } from "@/src/shared/hooks";
import {
  Error,
  Loader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export const Apparatus = () => {
  const bin = useParams().id ?? getCookie("id");

  const {
    data: apparatusData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`profApparatus ${bin}`],
    queryFn: async () => {
      const data: Record<string, string>[] = await GetWorkersByBin(
        bin as string,
      );
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !!bin,
  });
  const t = useTranslations();
  const { isAdmin } = usePermission();
  if (isLoading) return <Loader />;
  if (isError)
    return <Error className="block text-lg mt-10">{t("get.error")}</Error>;

  return (
    <section>
      <section className="flex justify-between">
        <section className="px-3 py-2 flex gap-4 bg-slate-200 border border-slate-400 rounded-md w-fit">
          <span>{t("profApparatus.stats")}</span>
          <span className="px-3 rounded-md font-bold bg-white">
            {apparatusData?.length}
          </span>
        </section>
        <section className="flex gap-4">
          <SearchButton />
          {isAdmin && <AddWorkersByFile />}
          <AddButton
            addForm={<AddWorkerForm />}
            label={t("profApparatus.add")}
          />
        </section>
      </section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("profApparatus.name")}</TableHead>
            <TableHead className="text-center">
              {t("profApparatus.position")}
            </TableHead>
            <TableHead className="text-center">
              {t("profApparatus.role")}
            </TableHead>
            <TableHead className="text-right">
              {t("profApparatus.visit")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apparatusData?.map((a, idx) => (
            <TableRow key={idx}>
              <TableCell>{a.name}</TableCell>
              <TableCell className="text-center">{a.position}</TableCell>
              <TableCell className="text-center">{a.role}</TableCell>
              <TableCell className="text-left grid justify-end">
                <Link
                  className="px-3 py-2 bg-gray-900 rounded-sm"
                  href={`/workers/${a.id}`}
                >
                  <Eye color="white" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
