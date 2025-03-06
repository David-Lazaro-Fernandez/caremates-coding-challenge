import { notFound } from "next/navigation";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { clsx } from "clsx";
import { Inter } from "next/font/google";
import { routing } from "@/src/i18n/routing";
import "./globals.css";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, "children">) {
  return {
    title: "",
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale}>
      <body className={clsx(inter.className, "flex h-full flex-col md:flex-row")}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
