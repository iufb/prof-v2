"use client";

import { SearchProfs } from "@/src/shared/api/prof";
import { Link } from "@/src/shared/config/routing";
import {
  Button,
  Input,
  Loader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/ui";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const SearchProf = () => {
  const t = useTranslations("search");
  const tGlobal = useTranslations();
  const { handleSubmit, register, control } = useForm<Record<string, string>>();
  const [search, setSearch] = useState<Record<string, string>>({});
  const {
    data: res,
    isPending,
    isError,
  } = useQuery({
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
    <section className="w-full min-w-[50rem]">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <section className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Наименование Профсоюза"
            {...register("union_name")}
          />
          <Input placeholder="БИН" {...register("bin")} />
          <Input placeholder="Председатель" {...register("chairman_name")} />
          <Input
            placeholder="Вышестоящая профсоюзная организация"
            {...register("higher_union_org")}
          />
          {selects.map((select, idx) => (
            <Controller
              key={select.label}
              control={control}
              name={selectKeys[idx]}
              render={({ field: { onChange, value } }) => (
                <div className="flex  flex-col gap-2">
                  <Label className="text-md ">{select.label}</Label>
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder={select.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {select.values.map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          ))}
        </section>
        <Button className="w-full">{t("page.btn")}</Button>
      </form>
      <section className="flex mt-10 w-full flex-col gap-5">
        {isPending && <Loader />}
        {res?.map((r) => (
          <Link href={`/prof/${r.bin}?type=about`} key={r.bin}>
            {r.union_name}
          </Link>
        ))}
      </section>
    </section>
  );
};
const selectKeys = [
  "industry", // Отрасль (наименование отрасли)
  "union_type", // Тип Профсоюза
];
