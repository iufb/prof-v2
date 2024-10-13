"use client";
import { DeleteButton } from "@/src/features";
import {
  DeleteCollegianBodies,
  GetCollegianBodies,
} from "@/src/shared/api/collegian-bodies";
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
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ReactNode, useState } from "react";

export const BodiesTable = () => {
  const { id } = useParams();
  const tGlobal = useTranslations();
  const types: { label: string; values: string[] } = tGlobal.raw(
    "addProfCollegiateBodiesForm.body_type",
  );
  const [type, setType] = useState<string>(types.values[0]);

  const {
    data: bodiesData,
    status,
    refetch,
  } = useQuery({
    queryKey: [`bodies ${id}`, type],
    queryFn: async () => {
      const data: Record<string, string>[] = await GetCollegianBodies();
      //TODO: GET BODIES BY PROF_ID
      return data.filter((d) => d.prof_id == id && d.body_type == type);
    },
    enabled: !!id && typeof id == "string",
  });
  const { isAdmin } = usePermission();
  const { mutate, isPending } = useMutation({
    mutationKey: [],
    mutationFn: DeleteCollegianBodies,
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [`bodies ${id}`],
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
        <SelectTrigger className="w-full bg-white mb-5">
          <SelectValue placeholder={types.label} />
        </SelectTrigger>
        <SelectContent>
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
          !bodiesData || bodiesData.length == 0 ? (
            <NotFound>{tGlobal("zero")}</NotFound>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">
                    {tGlobal("addProfCollegiateBodiesForm.name")}
                  </TableHead>
                  <TableHead className="text-center">
                    {tGlobal("addProfCollegiateBodiesForm.union_ticket_number")}
                  </TableHead>
                  <TableHead className="text-center">
                    {tGlobal("addProfCollegiateBodiesForm.position.label")}
                  </TableHead>
                  <TableHead className="text-center">
                    {tGlobal("addProfCollegiateBodiesForm.role.label")}
                  </TableHead>
                  {isAdmin && (
                    <TableHead className="text-right">
                      {tGlobal("deleteBtn.label")}
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-auto">
                {bodiesData?.map((a, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="text-center">{a.name}</TableCell>
                    <TableCell className="text-center">
                      {a.union_ticket_number}
                    </TableCell>
                    <TableCell className="text-center">{a.position}</TableCell>
                    <TableCell className="text-center">{a.role}</TableCell>
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
