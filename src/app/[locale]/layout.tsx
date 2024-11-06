import { QueryProvider } from "@/src/shared/providers";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "@/src/shared/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return {
    title: t("title"),
  };
}

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <main className="">
            <div className="bg-[#F73939] py-5 flex items-center justify-center ">
              <img
                src={"/header.png"}
                alt="header"
                className="w-full max-w-[380px] h-auto  mx-auto "
              />
            </div>

            <QueryProvider>
              <Toaster />
              {children}
            </QueryProvider>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
