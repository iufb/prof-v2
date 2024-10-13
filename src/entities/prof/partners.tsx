"use client";
import { AddButton, AddSocialPartnershipAgreementsForm } from "@/src/features";
import { TabsContent } from "@/src/shared/ui";
import { PartnershipsTable } from "@/src/widgets";
import { useTranslations } from "next-intl";

export const Partners = () => {
  const t = useTranslations("addSocialPartnershipAgreementsForm");
  return (
    <TabsContent value="partners">
      <section className="grid gap-y-10">
        <AddButton
          className="justify-self-end"
          addForm={<AddSocialPartnershipAgreementsForm />}
          label={t("title")}
        />
        <PartnershipsTable />
      </section>
    </TabsContent>
  );
};
