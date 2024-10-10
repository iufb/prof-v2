"use client";

import {
  AddAwardForm,
  AddVacationForm,
  EditButton,
  EditWorkerForm,
} from "@/src/features";
import { GetWorker } from "@/src/shared/api/worker";
import { DeleteFieldsFromObj } from "@/src/shared/lib/utils";
import { Error, Loader } from "@/src/shared/ui";
import { VerticalTable } from "@/src/shared/ui/vertical-table";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const WorkerTable = ({ id }: { id: string }) => {
  const t = useTranslations();
  const {
    data: workerData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`worker ${id}`],
    queryFn: async () => {
      const data = await GetWorker(id);
      console.log(data);

      return data;
    },
  });
  if (isLoading) return <Loader />;
  if (isError)
    return <Error className="block text-lg mt-10">{t("get.error")}</Error>;
  const tableValues = Object.values(
    DeleteFieldsFromObj(workerData, [
      "id",
      "photo",
      "awards_list",
      "vacation_list",
      "prof_id",
    ]),
  );

  return (
    <section className="flex flex-col gap-5 mt-3">
      <section className="flex justify-between">
        <Image
          className="rounded-md"
          src={workerData.photo ?? "/1.webp"}
          width={200}
          height={200}
          alt="photo"
        />
        <EditButton
          label={t("worker.edit")}
          editForm={<EditWorkerForm workerData={workerData} />}
        />
      </section>
      {workerData && (
        <VerticalTable labels={t.raw("worker.table")} values={tableValues} />
      )}
      <AddAwardForm id={id} />
      <AddVacationForm id={id} />
    </section>
  );
};
