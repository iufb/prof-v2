"use client";

import { GetVacations } from "@/src/shared/api/vacations";
import { useLocation } from "@/src/shared/hooks";
import { Vacation } from "@/src/shared/lib/types";
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
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

export const VacationsTable = () => {
  const t = useTranslations("addVacationForm");
  const tGlobal = useTranslations();
  const { getSearchParam } = useLocation();
  const id = getSearchParam("id");
  const {
    data: vacations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`getAwards`],
    queryFn: async () => {
      const data: Vacation[] = await GetVacations(id);
      return data;
    },
    enabled: !!id,
  });
  if (isLoading) return <Loader />;
  if (isError) return <Error className="p-3">{tGlobal("get.error")}</Error>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("vacation.label")}</TableHead>
          <TableHead className="text-right">{t("date")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vacations?.map((a, idx) => (
          <TableRow key={idx}>
            <TableCell>{a.sanatorium}</TableCell>
            <TableCell className="text-right">
              {dayjs(a.vacation_date).format("DD/MM/YYYY")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
