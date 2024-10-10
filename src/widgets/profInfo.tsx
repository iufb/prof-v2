"use client";
import { About, Apparatus } from "@/src/entities/prof";
import { useLocation } from "@/src/shared/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/ui";
import { useTranslations } from "next-intl";
export const ProfInfo = () => {
  const { router, pathname, getSearchParam } = useLocation();
  const t = useTranslations("navbar");
  const links: Array<{
    label: string;
    href: string;
  }> = t.raw("links")[0].children;
  const onTabSelect = (type: string) => {
    router.push(`${pathname}?type=${type}`);
  };

  return (
    <section className="px-5 pt-5 pb-5 overflow-auto  border border-slate-300  rounded-sm min-h-[calc(100svh-90px)] h-full">
      <Tabs defaultValue={getSearchParam("type") ?? "about"} className="">
        <TabsList className="gap-4 py-8 px-5 border border-slate-400">
          {links.map((link) => (
            <TabsTrigger
              key={link.href}
              onClick={() => onTabSelect(link.href.slice(7, link.href.length))}
              value={link.href.slice(7, link.href.length)}
              className="text-xl"
            >
              {link.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <About />
        <CollegiateBodies />
        <Apparatus />
        <Partners />
      </Tabs>
    </section>
  );
};
const CollegiateBodies = () => {
  return (
    <TabsContent value="collegiate-bodies">
      Make changes to your account here. bodies
    </TabsContent>
  );
};

const Partners = () => {
  return (
    <TabsContent value="partners">
      Make changes to your account here. Partnwer
    </TabsContent>
  );
};
