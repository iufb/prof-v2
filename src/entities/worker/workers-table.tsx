"use client";
import { GetWorkersByBin } from "@/src/shared/api/worker";
import { Link } from "@/src/shared/config/routing";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Error,
  Loader,
} from "@/src/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export const WorkersTable = () => {
  const id = useParams().id ?? getCookie("id");
  const t = useTranslations();
  const {
    data: apparatusData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [`archive ${id}`],
    queryFn: async () => {
      const data: Record<string, string>[] = await GetWorkersByBin(
        id as string,
      );
      return data.filter((w) => w.union_ticket_number == "deleted");
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  if (isFetching) return <Loader />;
  if (isError)
    return <Error className="block text-lg mt-10">{t("get.error")}</Error>;

  return (
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
  );
};
