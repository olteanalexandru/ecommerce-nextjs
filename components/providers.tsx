'use client';

import { ClientCartProvider } from 'components/cart/client-cart-provider';
import { LanguageProvider } from 'components/language-context';
import { Locale } from 'lib/i18n-client';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
  locale: Locale;
  messages: any;
  cart: Promise<any>;
}

export function Providers({ children, locale, messages, cart }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageProvider locale={locale} messages={messages}>
        <ClientCartProvider cart={cart}>
          {children}
        </ClientCartProvider>
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}
