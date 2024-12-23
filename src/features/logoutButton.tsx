"use client";
import { useLocation } from "@/src/shared/hooks";
import { Button } from "@/src/shared/ui";
import { deleteCookie } from "cookies-next";
import { LogOut } from "lucide-react";
import { ComponentProps } from "react";

type LogoutButtonProps = {} & ComponentProps<"button">;
export const LogoutButton = ({ ...props }: LogoutButtonProps) => {
  const logout = () => {
    deleteCookie("role");
    deleteCookie("token");
    deleteCookie("id");
    router.refresh();
  };
  const { router } = useLocation();
  return (
    <Button size={"sm"} onClick={logout} {...props}>
      <LogOut />
    </Button>
  );
};
