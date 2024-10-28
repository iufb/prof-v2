"use client";
import {
  AddButton,
  AddWorkerForm,
  AddWorkersByFile,
  DeleteButton,
  SearchButton,
} from "@/src/features";
import { GetWorkersByBin, PatchWorker } from "@/src/shared/api/worker";
import { Link } from "@/src/shared/config/routing";
import { usePermission } from "@/src/shared/hooks";
import { queryClient } from "@/src/shared/lib/client";
import {
  Button,
  Error,
  Loader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export const Apparatus = () => {
  const id = useParams().id ?? getCookie("id");

  const {
    data: apparatusData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`profApparatus ${id}`],
    queryFn: async () => {
      const data: Record<string, string>[] = await GetWorkersByBin(
        id as string,
      );
      return data.filter((w) => w.union_ticket_number !== "deleted");
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete worker"],
    mutationFn: PatchWorker,
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [`profApparatus ${id}`],
      });
    },
  });
  const t = useTranslations();
  const { isAdmin } = usePermission();
  if (isLoading) return <Loader />;
  if (isError)
    return <Error className="block text-lg mt-10">{t("get.error")}</Error>;

  return (
    <section>
      <section className="flex flex-col  md:flex-row gap-3 md:gap-0 justify-between">
        <section className="px-3 py-2 flex   gap-4 bg-slate-200 border border-slate-400 rounded-md w-fit">
          <span>{t("profApparatus.stats")}</span>
          <span className="px-3 rounded-md font-bold bg-white">
            {apparatusData?.length}
          </span>
        </section>
        <section className="flex  gap-4">
          <SearchButton />
          {isAdmin && <AddWorkersByFile />}
          <Link
            className="px-2 py-1 grid place-items-center bg-black text-white rounded-md text-center"
            href={`/prof/${id}/archive`}
          >
            {t("archive")}
          </Link>
          <AddButton
            className="mb-0"
            addForm={<AddWorkerForm />}
            label={t("profApparatus.add")}
          />
        </section>
      </section>
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
            {isAdmin && (
              <TableHead className="text-right">
                {t("profApparatus.delete")}
              </TableHead>
            )}
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
              {isAdmin && (
                <TableCell className="text-end">
                  <DeleteButton
                    btn={
                      <Button
                        disabled={isPending}
                        onClick={() =>
                          mutate({
                            id: a.id,
                            body: { union_ticket_number: "deleted" },
                          })
                        }
                      >
                        {t("profApparatus.delete")}
                      </Button>
                    }
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
