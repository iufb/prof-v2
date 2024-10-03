"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/src/shared/ui";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

export const VacationsTable = ({
  vacations,
}: {
  vacations: { sanatorium: string; vacation_date: Date }[];
}) => {
  const t = useTranslations("addVacationForm");
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("vacation.label")}</TableHead>
          <TableHead className="text-right">{t("date")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vacations.map((a, idx) => (
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
