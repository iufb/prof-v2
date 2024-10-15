import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/config/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "yekinsgnhome.ddns.net",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
