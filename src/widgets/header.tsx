import { LogoutButton } from "@/src/features";
import { Link } from "@/src/shared/config/routing";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/src/shared/ui";
import { Burger } from "@/src/widgets/Burger";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";

export const Header = ({ isAdmin, id }: { isAdmin: boolean; id: string }) => {
  return (
    <>
      <header className=" grid py-4 h-20 text-md ">
        <div className="max-w-[87.5rem] w-full mx-auto">
          <Navbar id={id} isAdmin={isAdmin} />
          <Burger />
        </div>
      </header>
    </>
  );
};
export const Navbar = async ({
  isAdmin,
  id,
}: {
  isAdmin: boolean;
  id: string;
}) => {
  const t = await getTranslations("navbar");
  const links: Array<{
    label: string;
    href: string;
    children?: { label: string; href: string }[];
  }> = t.raw("links");
  return (
    <NavigationMenu className="flex-1 w-full mx-auto hidden md:block ">
      <NavigationMenuList className=" w-full gap-4 ">
        {links.map((link, idx) => (
          <NavigationMenuItem
            className={clsx(
              isAdmin &&
                (link.children || link.href.includes("workers")) &&
                "hidden",
            )}
            key={idx}
          >
            {link.children ? (
              <>
                <NavigationMenuTrigger className="text-md">
                  {link.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col gap-3 p-3">
                    {link.children.map((child, idx) => (
                      <li className=" font-medium" key={idx}>
                        <Link href={child.href.replace("{id}", id)}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link
                className={clsx(
                  "font-medium",
                  !isAdmin && link.href.includes("search") && "hidden",
                )}
                href={link.href}
              >
                {link.label}
              </Link>
            )}
          </NavigationMenuItem>
        ))}
        {isAdmin && (
          <>
            <Link
              className="font-bold bg-black rounded-md text-white px-3 py-1"
              href={"/add?type=prof"}
            >
              {t("add.prof")}
            </Link>
            <Link
              className="font-bold bg-black rounded-md text-white px-3 py-1"
              href={"/add?type=pass"}
            >
              {t("add.pass")}
            </Link>
          </>
        )}
        <LogoutButton className={"justify-self-end flex-1"} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};
