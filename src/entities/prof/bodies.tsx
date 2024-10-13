"use client";
import { AddButton, AddProfCollegiateBodiesForm } from "@/src/features";
import { TabsContent } from "@/src/shared/ui";
import { BodiesTable } from "@/src/widgets";
import { useTranslations } from "next-intl";

export const CollegiateBodies = () => {
  const t = useTranslations();
  return (
    <TabsContent value="collegiate-bodies">
      <section className="grid gap-y-10">
        <AddButton
          className="justify-self-end"
          addForm={<AddProfCollegiateBodiesForm />}
          label={t("bodies.label")}
        />
        <BodiesTable />
      </section>
    </TabsContent>
  );
};
