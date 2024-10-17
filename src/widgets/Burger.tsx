"use client";
import { LogoutButton } from "@/src/features";
import { Link } from "@/src/shared/config/routing";
import { usePermission } from "@/src/shared/hooks";
import { Sheet, SheetContent, SheetTrigger } from "@/src/shared/ui";
import clsx from "clsx";
import { getCookie } from "cookies-next";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
interface Link {
  label: string;
  href: string;
}
export const Burger = () => {
  const t = useTranslations();
  const id = useParams().id;
  const path = usePathname();
  const { isAdmin } = usePermission();
  const links: Link[] = t.raw("navbar.mobileLinks");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetTrigger
        onClick={() => setOpen(true)}
        className="justify-self-end block md:hidden"
      >
        <Menu size={48} />
      </SheetTrigger>
      <SheetContent className="bg-white">
        <section className="flex flex-col gap-3 mt-4">
          {links.map((link, idx) => (
            <Link
              className={clsx(idx > 5 ? "block" : "hidden")}
              key={link.href.replace("{id}", getCookie("id") ?? (id as string))}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <>
              <Link
                className="  font-bold bg-black rounded-md text-white px-3 py-2"
                href={"/add?type=prof"}
              >
                {t("navbar.add.prof")}
              </Link>
              <Link
                className="font-bold bg-black rounded-md text-white px-3 py-2"
                href={"/add?type=pass"}
              >
                {t("navbar.add.pass")}
              </Link>
            </>
          )}
          <LogoutButton className={"justify-self-end flex-1 py-2"} />
        </section>
      </SheetContent>
    </Sheet>
  );
};
