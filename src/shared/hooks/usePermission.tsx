"use client";
import { getCookie } from "cookies-next";

export const usePermission = () => {
  const role = getCookie("role");
  return { isAdmin: role == "admin" };
};
