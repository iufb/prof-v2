import { routing } from "@/src/shared/config/routing";
import createMiddleware from "next-intl/middleware";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ru|kz)/:path*"],
};
