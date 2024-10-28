"use client";

import { SearchWorkers } from "@/src/shared/api/worker";
import { useLocation } from "@/src/shared/hooks";
import {
  Button,
  CustomSelect,
  Error,
  Input,
  Loader,
  NotFound,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/ui";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const SearchWorker = () => {
  const id = useParams().id;
  const t = useTranslations("search");
  const tGlobal = useTranslations();
  const { router } = useLocation();
  const { handleSubmit, register, control, reset } = useForm<
    Record<string, string>
  >({
    defaultValues: {
      name: "",
      union_ticket_number: "",
      birth_date: "",
      gender: "",
      role: "",
      education: "",
      position: "",
    },
  });
  const [search, setSearch] = useState<Record<string, string>>({});
  const {
    data: res,
    status,
    isLoading,
  } = useQuery({
    queryKey: ["searchworker", ...Object.values(search)],
    queryFn: async () => {
      const data: Record<string, string>[] = await SearchWorkers({
        ...search,
        prof_id: (id as string) ?? "",
      });
      return data.filter((w) => w.union_ticket_number !== "deleted");
    },
    enabled: Object.keys(search).length > 0,
  });

  const onSubmit: SubmitHandler<Record<string, string>> = (data) => {
    Object.keys(data).forEach((d) => {
      if (!data[d]) {
        delete data[d];
      }
    });

    setSearch(data);
  };
  const selects: { label: string; values: string[] }[] =
    tGlobal.raw("workerForm.selects");

  return (
    <section className="">
      <form
        className="w-full flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="grid grid-cols-3 gap-4">
          <Input placeholder={t("page.worker.name")} {...register("name")} />
          <Input
            placeholder={t("page.worker.number")}
            {...register("union_ticket_number")}
          />
          <Input
            placeholder={t("page.worker.date")}
            {...register("birth_date")}
          />
          {selects.map((select, idx) => (
            <Controller
              key={select.label}
              control={control}
              name={selectKeys[idx]}
              render={({ field: { onChange, value } }) => {
                return (
                  <CustomSelect
                    key={idx}
                    value={value}
                    onChange={onChange}
                    label={select.label}
                    content={select.values}
                  />
                );
              }}
            />
          ))}
        </section>
        <Button className="w-full">{t("page.btn")}</Button>
        <Button
          onClick={() => {
            reset();
          }}
        >
          {t("page.reset")}
        </Button>
      </form>
      <section
        className={clsx(
          "flex  bg-slate-200 p-3 rounded-md min-h-32  mt-10 w-full flex-col gap-5",
          res && res.length > 5 && "overflow-auto mb-4",
        )}
      >
        {GetUI({
          status,
          isLoading,
          ui:
            res?.length == 0 ? (
              <NotFound>Не найдено</NotFound>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">
                      {t("page.worker.name")}
                    </TableHead>
                    <TableHead className="text-center">
                      {t("page.worker.number")}
                    </TableHead>
                    <TableHead className="text-center">
                      {t("page.worker.position")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {res?.map((r) => (
                    <TableRow
                      className="cursor-pointer"
                      onClick={() => {
                        router.push(`/workers/${r.id}`);
                      }}
                      key={r.bin}
                    >
                      <TableCell className="text-center">{r.name}</TableCell>
                      <TableCell className="text-center">
                        {r.union_ticket_number}
                      </TableCell>
                      <TableCell className="text-center">
                        {r.position}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ),
        })}
      </section>
    </section>
  );
};

const GetUI = ({
  status: status,
  ui,
  isLoading,
}: {
  status: string;
  ui: ReactNode;
  isLoading: boolean;
}) => {
  const tGlobal = useTranslations();
  switch (status) {
    case "pending":
      return isLoading ? <Loader /> : <></>;
    case "error":
      return <Error className="p-3">{tGlobal("get.error")}</Error>;
    case "success":
      return ui;
  }
};
const selectKeys = ["gender", "position", "role", "education"];
