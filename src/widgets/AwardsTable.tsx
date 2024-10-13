"use client";
import { useToast } from "@/hooks/use-toast";
import { DeleteButton } from "@/src/features";
import { DeleteAward, GetAwards } from "@/src/shared/api/awards";
import { useLocation, usePermission } from "@/src/shared/hooks";
import { queryClient } from "@/src/shared/lib/client";
import { Award } from "@/src/shared/lib/types";
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
export const AwardsTable = ({ id }: { id?: string }) => {
  const t = useTranslations("addAwardForm");
  const tGlobal = useTranslations();
  const { getSearchParam } = useLocation();
  const {
    data: awards,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`getAwards ${id ?? getSearchParam("id")}`],
    queryFn: async () => {
      const data: Award[] = await GetAwards(id ?? getSearchParam("id"));
      return data;
    },
    enabled: !!getSearchParam("id") || !!id,
  });
  const { isAdmin } = usePermission();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationKey: [],
    mutationFn: DeleteAward,
    onSuccess: () => {
      toast({ title: tGlobal("toast.delete") });
    },
    onError: () => {
      toast({ title: tGlobal("toast.error") });
    },

    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [`getAwards ${id ?? getSearchParam("id")}`],
      });
    },
  });
  if (isLoading) return <Loader />;
  if (isError) return <Error className="p-3">{tGlobal("get.error")}</Error>;
  if (!awards || awards.length == 0) return <NotFound>{t("zero")}</NotFound>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("award.label")}</TableHead>
          <TableHead className="text-center">{t("date")}</TableHead>
          {isAdmin && (
            <TableHead className="text-right">{t("delete")}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {awards?.map((a, idx) => (
          <TableRow key={idx}>
            <TableCell>{a.award_type}</TableCell>
            <TableCell className="text-right">
              {dayjs(a.award_date).format("DD/MM/YYYY")}
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
