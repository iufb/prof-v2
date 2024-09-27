"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/ui";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export const ProfInfo = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("navbar");
  const links: Array<{
    label: string;
    href: string;
  }> = t.raw("links")[0].children;
  const onTabSelect = (type: string) => {
    router.push(`${pathname}?type=${type}`);
  };

  return (
    <section className="p-5 border border-slate-300  rounded-sm min-h-[calc(100svh-90px)]">
      <Tabs defaultValue={searchParams.get("type") ?? "about"}>
        <TabsList className="gap-4 py-8 px-5">
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
const About = () => {
  return (
    <TabsContent value="about">Make changes to your account here.</TabsContent>
  );
};
const CollegiateBodies = () => {
  return (
    <TabsContent value="collegiate-bodies">
      Make changes to your account here. bodies
    </TabsContent>
  );
};
const Apparatus = () => {
  return (
    <TabsContent value="apparatus">
      Make changes to your account here. apparatus
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
