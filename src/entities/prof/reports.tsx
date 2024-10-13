import { AddButton, AddReportForm } from "@/src/features";
import { ReportsTable } from "@/src/widgets";
import { TabsContent } from "@radix-ui/react-tabs";
import { useTranslations } from "next-intl";

export const Reports = () => {
  const t = useTranslations();
  return (
    <TabsContent value="reports" className="mt-[.5rem]">
      <section className="grid  gap-y-10">
        <AddButton
          className="justify-self-end"
          addForm={<AddReportForm />}
          label={t("addReportForm.title")}
        />
        <ReportsTable />
      </section>
    </TabsContent>
  );
};
