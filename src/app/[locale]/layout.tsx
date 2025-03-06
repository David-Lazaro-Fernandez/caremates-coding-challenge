import {notFound} from 'next/navigation';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';
import {ReactNode} from 'react';
import {clsx} from 'clsx';
import {Inter} from 'next/font/google';
import {routing} from '@/src/i18n/routing';

import './styles.css';

type Props = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

const inter = Inter({subsets: ['latin']});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  return {
    title: ''
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale}>
      <body className={clsx(inter.className, 'flex h-full flex-row')}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
  