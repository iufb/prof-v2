import { Link } from "@/src/shared/config/routing";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/src/shared/ui";
import { getTranslations } from "next-intl/server";

export const Header = () => {
  return (
    <header className="max-w-[1400px] mx-auto">
      <Navbar />
    </header>
  );
};

const Navbar = async () => {
  const t = await getTranslations("navbar");
  const links: Array<{
    label: string;
    href: string;
    children?: { label: string; href: string }[];
  }> = t.raw("links");
  console.log(links);

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        {links.map((link, idx) => (
          <NavigationMenuItem key={idx}>
            {link.children ? (
              <>
                <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col gap-3 p-3">
                    {link.children.map((child, idx) => (
                      <li className="text-sm font-medium" key={idx}>
                        <Link href={child.href}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link className="text-sm font-medium" href={link.href}>
                {link.label}
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
