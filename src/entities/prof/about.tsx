"use client";
import { EditButton, EditProfForm } from "@/src/features";
import { GetProf } from "@/src/shared/api/prof";
import { Error, Loader, TabsContent } from "@/src/shared/ui";
import { VerticalTable } from "@/src/shared/ui/vertical-table";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export const About = () => {
  const { id: bin } = useParams();
  const {
    data: profData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`profAbout ${bin}`],
    queryFn: async () => {
      const data = await GetProf(bin as string);
      return data;
    },
    enabled: !!bin,
  });
  const t = useTranslations();
  if (isLoading) return <Loader />;
  if (isError) return <Error>{t("get.error")}</Error>;
  return (
    <TabsContent value="about">
      <section className="grid gap-3">
        {profData && (
          <>
            <EditButton
              className="justify-self-end"
              editForm={<EditProfForm profData={profData} />}
              label={t("profAbout.edit")}
            />
            <VerticalTable
              labels={t.raw("profAbout.table")}
              values={Object.values(profData)}
            />
          </>
        )}
      </section>
    </TabsContent>
  );
};
