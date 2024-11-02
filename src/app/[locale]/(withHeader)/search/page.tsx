import { SearchProf, SearchWorker } from "@/src/features";
import { Link } from "@/src/shared/config/routing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/ui";
import {} from "@radix-ui/react-tabs";
import { getTranslations } from "next-intl/server";

export default async function Page({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const t = await getTranslations("search");
  const tabs: Array<{ label: string; value: string }> = t.raw("page.tabs");
  return (
    <section className="w-full px-3">
      <Tabs value={searchParams.type} defaultValue={searchParams.type}>
        <TabsList className="gap-4 py-8 px-5 border border-slate-400 ">
          {tabs.map((t) => (
            <TabsTrigger className="" key={t.value} value={t.value}>
              <Link href={{ query: { type: t.value } }}>{t.label}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="prof">
          <SearchProf />
        </TabsContent>
        <TabsContent value="worker">
          <SearchWorker />
        </TabsContent>
      </Tabs>
    </section>
  );
}
