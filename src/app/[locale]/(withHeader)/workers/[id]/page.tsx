import { WorkerTable } from "@/src/entities/worker";
import { getTranslations } from "next-intl/server";

export default async function WorkerPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const t = await getTranslations("worker");
  return (
    <section className="p-5 border mb-5 border-slate-300 rounded-md min-h-[calc(100vh-100px)] overflow-auto">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <WorkerTable id={id} />
    </section>
  );
}
