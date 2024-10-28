import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/config/request.ts");
const url = process.env.NEXT_PUBLIC_BACKENDURL || "";
const hostname = new URL(url).hostname;
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname,
      },
    ],
  },
};

export default withNextIntl(nextConfig);
