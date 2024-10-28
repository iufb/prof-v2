"use client";

import { SearchProfs } from "@/src/shared/api/prof";
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
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const SearchProf = () => {
  const t = useTranslations("search");
  const tGlobal = useTranslations();
  const { router } = useLocation();
  const { handleSubmit, register, control, reset } = useForm<
    Record<string, string>
  >({
    defaultValues: {
      union_name: "",
      bin: "",
      chairman_name: "",
      higher_union_org: "",
      industry: "",
      union_type: "",
    },
  });
  const [search, setSearch] = useState<Record<string, string>>({});
  const { data: res, status } = useQuery({
    queryKey: ["searchprof", ...Object.values(search)],
    queryFn: async () => {
      const data: Record<string, string>[] = await SearchProfs(search);
      return data;
    },
    enabled: !!search,
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
    tGlobal.raw("profForm.selects");
  return (
    <section className="w-full ">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <section className="grid grid-cols-3 gap-4">
          <Input
            placeholder={t("page.prof.name")}
            {...register("union_name")}
          />
          <Input placeholder={t("page.prof.bin")} {...register("bin")} />
          <Input
            placeholder={t("page.prof.chairman")}
            {...register("chairman_name")}
          />
          <Input
            placeholder={t(`page.prof.higher`)}
            {...register("higher_union_org")}
          />
          {selects.map((select, idx) => (
            <Controller
              key={select.label}
              control={control}
              name={selectKeys[idx]}
              render={({ field: { onChange, value } }) => (
                <CustomSelect
                  value={value}
                  onChange={onChange}
                  label={select.label}
                  content={select.values}
                />
              )}
            />
          ))}
        </section>
        <Button className="w-full">{t("page.btn")}</Button>
        <Button onClick={() => reset()}>{t("page.reset")}</Button>
      </form>
      <section className="flex bg-slate-200 p-3 rounded-md min-h-32  mt-10 w-full flex-col gap-5 mb-4 overflow-auto">
        {GetUI({
          status,
          ui:
            res?.length == 0 ? (
              <NotFound>Не найдено</NotFound>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">
                      {t("page.prof.name")}
                    </TableHead>
                    <TableHead className="text-center">
                      {t("page.prof.bin")}
                    </TableHead>
                    <TableHead className="text-center">
                      {t("page.prof.industry")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {res?.map((r) => (
                    <TableRow
                      className="cursor-pointer"
                      onClick={() => {
                        router.push(`/prof/${r.id}?type=about`);
                      }}
                      key={r.bin}
                    >
                      <TableCell className="text-center">
                        {r.union_name}
                      </TableCell>
                      <TableCell className="text-center">{r.bin}</TableCell>
                      <TableCell className="text-center">
                        {r.industry}
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

const selectKeys = [
  "industry", // Отрасль (наименование отрасли)
  "union_type", // Тип Профсоюза
];
