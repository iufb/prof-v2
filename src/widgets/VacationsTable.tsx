"use client";

import { useToast } from "@/hooks/use-toast";
import { DeleteButton } from "@/src/features";
import { DeleteVacation, GetVacations } from "@/src/shared/api/vacations";
import { useLocation, usePermission } from "@/src/shared/hooks";
import { queryClient } from "@/src/shared/lib/client";
import { Vacation } from "@/src/shared/lib/types";
import {
  Button,
  Error,
  Loader,
  NotFound,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

export const VacationsTable = ({ id }: { id?: string }) => {
  const t = useTranslations("addVacationForm");
  const tGlobal = useTranslations();
  const { getSearchParam } = useLocation();
  const {
    data: vacations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`getVacations ${id ?? getSearchParam("id")}`],
    queryFn: async () => {
      const data: Vacation[] = await GetVacations(id ?? getSearchParam("id"));
      return data;
    },
    enabled: !!getSearchParam("id") || !!id,
  });
  const { isAdmin } = usePermission();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationKey: [],
    mutationFn: DeleteVacation,
    onSuccess: () => {
      toast({ title: tGlobal("toast.delete") });
    },
    onError: () => {
      toast({ title: tGlobal("toast.error") });
    },

    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [`getVacations ${id ?? getSearchParam("id")}`],
      });
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <Error className="p-3">{tGlobal("get.error")}</Error>;
  if (!vacations || vacations.length == 0)
    return <NotFound>{t("zero")}</NotFound>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("vacation.label")}</TableHead>
          <TableHead className="text-right">{t("date")}</TableHead>
          {isAdmin && (
            <TableHead className="text-right">
              {tGlobal("deleteBtn.label")}
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {vacations?.map((a, idx) => (
          <TableRow key={idx}>
            <TableCell>{a.sanatorium}</TableCell>
            <TableCell className="text-center">
              {dayjs(a.vacation_date).format("DD/MM/YYYY")}
            </TableCell>
            {isAdmin && (
              <TableCell className="text-end">
                <DeleteButton
                  btn={
                    <Button onClick={() => mutate(a.id)} disabled={isPending}>
                      {tGlobal("deleteBtn.label")}
                    </Button>
                  }
                />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
