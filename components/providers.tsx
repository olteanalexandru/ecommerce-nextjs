'use client';

import { LanguageProvider } from 'components/language-context';
import { Locale } from 'lib/i18n-client';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
  locale: Locale;
  messages: any;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageProvider locale={locale} messages={messages}>
        {children}
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}
