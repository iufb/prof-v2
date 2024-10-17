"use client";
import { useToast } from "@/hooks/use-toast";
import { DeleteButton } from "@/src/features";
import { DeleteReport, GetReports } from "@/src/shared/api/reports";
import { usePermission } from "@/src/shared/hooks";
import { queryClient } from "@/src/shared/lib/client";
import {
  Button,
  Error,
  Loader,
  NotFound,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { File } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ReactNode, useState } from "react";

export const ReportsTable = () => {
  const id = useParams().id;
  const tGlobal = useTranslations();
  const types: { label: string; values: string[] } = tGlobal.raw(
    "addReportForm.report_type",
  );
  const [type, setType] = useState<string>(types.values[0]);

  const {
    data: reportsDate,
    status,
    refetch,
  } = useQuery({
    queryKey: [`reports ${id}`, type],
    queryFn: async () => {
      const data: Record<string, string>[] = await GetReports(id as string);
      //TODO: GET BODIES BY PROF_ID
      return data.filter((d) => d.prof_id == id && d.report_type == type);
    },
    enabled: !!id && typeof id == "string",
  });
  const { toast } = useToast();
  const { isAdmin } = usePermission();
  const { mutate, isPending } = useMutation({
    mutationKey: [],
    mutationFn: DeleteReport,
    onSuccess: () => {
      toast({ title: tGlobal("toast.delete") });
    },
    onError: () => {
      toast({ title: tGlobal("toast.error") });
    },

    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [`reports ${id}`],
      });
    },
  });
  const filterBodies = (value: string) => {
    setType(value);
    refetch();
  };

  return (
    <section>
      <Select onValueChange={filterBodies} value={type}>
        <SelectTrigger className="w-72 md:w-full  bg-white mb-5">
          <SelectValue placeholder={types.label} />
        </SelectTrigger>
        <SelectContent className="w-72 md:w-full">
          {types.values.map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {GetUI({
        status,
        ui:
          !reportsDate || reportsDate.length == 0 ? (
            <NotFound>{tGlobal("zero")}</NotFound>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">
                    {tGlobal("addReportForm.creator")}
                  </TableHead>
                  <TableHead className="text-center">
                    {tGlobal("addReportForm.document")}
                  </TableHead>
                  <TableHead className="text-center">
                    {tGlobal("addReportForm.status")}
                  </TableHead>
                  <TableHead className="text-center">
                    {tGlobal("addReportForm.creation_date")}
                  </TableHead>
                  <TableHead className="text-center">
                    {tGlobal("addReportForm.submission_date")}
                  </TableHead>
                  <TableHead className="text-center">
                    {tGlobal("addReportForm.acceptance_date")}
                  </TableHead>
                  {isAdmin && (
                    <TableHead className="text-right">
                      {tGlobal("deleteBtn.label")}
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-auto">
                {reportsDate?.map((a, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="text-center">{a.creator}</TableCell>
                    <TableCell className="text-center">
                      <a
                        href={a.document}
                        target="_blank"
                        className="flex justify-center"
                      >
                        <File />
                      </a>
                    </TableCell>
                    <TableCell className="text-center">{a.status}</TableCell>
                    <TableCell className="text-center">
                      {a.creation_date}
                    </TableCell>
                    <TableCell className="text-center">
                      {a.submission_date}
                    </TableCell>
                    <TableCell className="text-center">
                      {a.acceptance_date}
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-end">
                        <DeleteButton
                          btn={
                            <Button
                              onClick={() => mutate(a.id)}
                              disabled={isPending}
                            >
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
          ),
      })}
    </section>
  );
};

const GetUI = ({ status: status, ui }: { status: string; ui: ReactNode }) => {
  const tGlobal = useTranslations();
  switch (status) {
    case "pending":
      return <Loader />;
    case "error":
      return <Error className="p-3">{tGlobal("get.error")}</Error>;
    case "success":
      return ui;
  }
};
