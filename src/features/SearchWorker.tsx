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
import { ReactNode, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
const filterWorkers = (
  list: Record<string, string>[] | undefined,
  searchTerms: Record<string, string>,
) => {
  if (!list) return [];

  return list.filter((rec) => {
    const isValid = Object.entries(searchTerms).every(([key, value]) => {
      if (!value) return true; // Skip empty search terms

      // Handle filtering by day, month, and year for the birth_date field
      if (["day", "month", "year"].includes(key)) {
        const [year, month, day] = rec.birth_date
          ? rec.birth_date.split("-")
          : ["", "", ""];
        if (key === "day") return day === value;
        if (key === "month") return month === value;
        if (key === "year") return year === value;
      }

      // Default string comparison for other fields
      return rec[key]?.toLowerCase().includes(value.toLowerCase());
    });

    return isValid;
  });
};
export const SearchWorker = () => {
  const id = useParams().id;
  const t = useTranslations("search");
  const tGlobal = useTranslations();
  const { router } = useLocation();
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<Record<string, string>>({
    defaultValues: {
      name: "",
      union_ticket_number: "",
      day: "",
      month: "",
      year: "",
      gender: "",
      role: "",
      education: "",
      position: "",
    },
  });
  const {
    data: res,
    status,
    isLoading,
  } = useQuery({
    queryKey: ["searchworker"],
    queryFn: async () => {
      const data: Record<string, string>[] = await SearchWorkers({
        prof_id: (id as string) ?? "",
      });
      return data.filter((w) => w.union_ticket_number !== "deleted");
    },
  });
  const [result, setResult] = useState<Record<string, string>[]>([]);
  const onSubmit: SubmitHandler<Record<string, string>> = (data) => {
    const isSearchEmpty = Object.values(data).every((value) => value === "");
    if (isSearchEmpty) return;
    const filteredResults = filterWorkers(res, data);
    setResult(filteredResults);
  };

  const selects: { label: string; values: string[] }[] =
    tGlobal.raw("workerForm.selects");

  return (
    <section className="">
      <span className="py-3 text-gray-400">{t("page.worker.hint")}</span>
      <form
        className="w-full flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input placeholder={t("page.worker.name")} {...register("name")} />
          <Input
            placeholder={t("page.worker.number")}
            {...register("union_ticket_number")}
          />
          <Input
            placeholder={t("page.worker.date.day")}
            type="number"
            error={errors["day"]?.message}
            {...register("day", {
              minLength: { value: 2, message: t("page.worker.date.error") },
              maxLength: { value: 2, message: t("page.worker.date.error") },
            })}
          />
          <Input
            placeholder={t("page.worker.date.month")}
            type="number"
            error={errors["month"]?.message}
            {...register("month", {
              minLength: { value: 2, message: t("page.worker.date.error") },
              maxLength: { value: 2, message: t("page.worker.date.error") },
            })}
          />
          <Input
            placeholder={t("page.worker.date.year")}
            type="number"
            error={errors["year"]?.message}
            {...register("year", {
              minLength: { value: 4, message: t("page.worker.date.error") },
              maxLength: { value: 4, message: t("page.worker.date.error") },
            })}
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
            setResult([]);
          }}
        >
          {t("page.reset")}
        </Button>
      </form>
      <section
        className={clsx(
          "flex  bg-slate-200 p-3 rounded-md min-h-32  mt-10 w-full flex-col gap-5",
          result && result.length > 5 && "overflow-auto mb-4",
        )}
      >
        {GetUI({
          status,
          isLoading,
          ui:
            result.length == 0 ? (
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
                  {result.map((r) => (
                    <TableRow
                      className="cursor-pointer"
                      onClick={() => {
                        router.push(`/workers/${r.id}`);
                      }}
                      key={r.id}
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
