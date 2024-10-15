"use client";
import {
  About,
  Apparatus,
  CollegiateBodies,
  Partners,
  Reports,
} from "@/src/entities/prof";
import { useLocation } from "@/src/shared/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/ui";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
export const ProfInfo = () => {
  const { router, pathname, getSearchParam } = useLocation();
  const id = useParams().id;
  const t = useTranslations("navbar");
  const links: Array<{
    label: string;
    href: string;
  }> = t.raw("links")[0].children;
  const onTabSelect = (type: string) => {
    if (id) {
      router.push(`/${pathname}?type=${type}`);
    } else {
      router.push(`/${pathname}/${getCookie("id")}?type=${type}`);
    }
  };

  return (
    <section className="px-5 pt-5 pb-5 overflow-auto   border border-slate-300  rounded-sm min-h-[calc(100svh-5.625rem)] h-full">
      <Tabs
        value={getSearchParam("type")}
        defaultValue={getSearchParam("type") ?? "about"}
      >
        <TabsList className="gap-4 py-8 px-5 border border-slate-400">
          {links.map((link) => {
            return (
              <TabsTrigger
                key={link.href}
                onClick={() =>
                  onTabSelect(link.href.slice(16, link.href.length))
                }
                value={link.href.slice(16, link.href.length)}
                className="text-lg"
              >
                {link.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <About />
        <CollegiateBodies />

        <TabsContent value="apparatus">
          <Apparatus />
        </TabsContent>
        <Partners />
        <Reports />
      </Tabs>
    </section>
  );
};
