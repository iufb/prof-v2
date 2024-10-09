"use client";
import { GetAwards } from "@/src/shared/api/awards";
import { useLocation } from "@/src/shared/hooks";
import { Award } from "@/src/shared/lib/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Loader,
  NotFound,
  Error,
} from "@/src/shared/ui";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

export const AwardsTable = () => {
  const t = useTranslations("addAwardForm");
  const tGlobal = useTranslations();
  const { getSearchParam } = useLocation();
  const id = getSearchParam("id");
  const {
    data: awards,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`getAwards`],
    queryFn: async () => {
      const data: Award[] = await GetAwards(id);
      return data;
    },
    enabled: !!id,
  });
  if (isLoading) return <Loader />;
  if (isError) return <Error className="p-3">{tGlobal("get.error")}</Error>;
  if (!awards || awards.length == 0) return <NotFound>{t("zero")}</NotFound>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("award.label")}</TableHead>
          <TableHead className="text-right">{t("date")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {awards?.map((a, idx) => (
          <TableRow key={idx}>
            <TableCell>{a.award_type}</TableCell>
            <TableCell className="text-right">
              {dayjs(a.award_date).format("DD/MM/YYYY")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
