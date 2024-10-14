"use client";
import { useToast } from "@/hooks/use-toast";
import { DeleteButton } from "@/src/features";
import { DeletePartnership, GetPartnerships } from "@/src/shared/api/partners";
import { usePermission } from "@/src/shared/hooks";
import { queryClient } from "@/src/shared/lib/client";
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
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
export const PartnershipsTable = () => {
  const t = useTranslations("addSocialPartnershipAgreementsForm");
  const id = useParams().id as string;
  const tGlobal = useTranslations();
  const {
    data: awards,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`GetPartnerships ${id}`],
    queryFn: async () => {
      const data: Record<string, string>[] = await GetPartnerships();
      return data.filter((d) => d.prof_id == id);
    },
    enabled: !!id,
  });
  const { isAdmin } = usePermission();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationKey: ["Delete Partnerships"],
    mutationFn: DeletePartnership,
    onSuccess: () => {
      toast({ title: tGlobal("toast.delete") });
    },
    onError: () => {
      toast({ title: tGlobal("toast.error") });
    },

    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [`GetPartnerships ${id}`],
      });
    },
  });
  if (isLoading) return <Loader />;
  if (isError) return <Error className="p-3">{tGlobal("get.error")}</Error>;
  if (!awards || awards.length == 0)
    return <NotFound>{tGlobal("zero")}</NotFound>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">
            {t("agreement_type.label")}
          </TableHead>
          <TableHead className="text-center">{t("start_date")}</TableHead>
          <TableHead className="text-center">{t("end_date")}</TableHead>
          {isAdmin && (
            <TableHead className="text-right">
              {tGlobal("deleteBtn.label")}
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {awards?.map((a, idx) => (
          <TableRow key={idx}>
            <TableCell className="text-left">{a.agreement_type}</TableCell>
            <TableCell className="text-center">{a.start_date}</TableCell>
            <TableCell className="text-center">{a.end_date}</TableCell>
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
