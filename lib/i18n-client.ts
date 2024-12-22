export type Locale = 'en' | 'ro';
export type Messages = typeof import('./messages/en.json');

// Client-side locale detection
export function detectClientLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  
  // Check cookie first
  const localeCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('locale='));
  
  if (localeCookie) {
    const locale = localeCookie.split('=')[1];
    if (locale === 'ro' || locale === 'en') {
      return locale;
    }
  }
  
  // Fallback to browser language
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('ro') ? 'ro' : 'en';
}

// Set locale in cookie
export function setLocale(locale: Locale) {
  document.cookie = `locale=${locale};path=/;max-age=31536000`; // 1 year
}

// Format prices according to locale
export function formatPrice(price: number, locale: Locale) {
  return new Intl.NumberFormat(locale === 'ro' ? 'ro-RO' : 'en-US', {
    style: 'currency',
    currency: locale === 'ro' ? 'RON' : 'USD'
  }).format(price);
}

// Get translation for a specific key
export function getTranslation(messages: Messages, key: string) {
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
