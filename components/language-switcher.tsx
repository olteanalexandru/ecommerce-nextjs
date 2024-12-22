'use client';

import { Locale, setLocale } from 'lib/i18n-client';
import { useLanguage } from './language-context';

export function LanguageSwitcher() {
  const { locale } = useLanguage();

  const toggleLanguage = async () => {
    const newLocale: Locale = locale === 'en' ? 'ro' : 'en';
    await setLocale(newLocale);
    window.location.reload(); // Reload to apply new language
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-sm font-medium text-black transition-colors dark:border-neutral-700 dark:text-white"
      aria-label="Switch language"
    >
      {locale === 'en' ? 'RO' : 'EN'}
    </button>
  );
}
