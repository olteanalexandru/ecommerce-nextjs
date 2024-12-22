'use client';

import type { Locale, Messages } from 'lib/i18n-client';
import { createContext, ReactNode, useContext } from 'react';

interface LanguageContextType {
  locale: Locale;
  messages: Messages;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
  locale,
  messages
}: {
  children: ReactNode;
  locale: Locale;
  messages: Messages;
}) {
  return (
    <LanguageContext.Provider value={{ locale, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation(key: string) {
  const { messages } = useLanguage();
  const keys = key.split('.');
  let current: any = messages;
  
  for (const k of keys) {
    if (current[k] === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    current = current[k];
  }
  
  return current;
}
