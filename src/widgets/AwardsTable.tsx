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

export const AwardsTable = ({
  awards,
}: {
  awards: { award_date: Date; award_type: string }[];
}) => {
  const t = useTranslations("addAwardForm");
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("award.label")}</TableHead>
          <TableHead className="text-right">{t("date")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {awards.map((a, idx) => (
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
