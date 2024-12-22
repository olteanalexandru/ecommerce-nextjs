import { cookies } from 'next/headers';
import type { Locale, Messages } from './i18n-client';

// Get the user's locale from cookies on the server
export async function getServerLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get('locale');
    if (localeCookie?.value === 'ro' || localeCookie?.value === 'en') {
      return localeCookie.value;
    }
  } catch (error) {
    console.warn('Failed to get locale from cookie:', error);
  }

  return 'en';
}

// Load messages for the current locale
export async function getServerMessages(locale: Locale): Promise<Messages> {
  return (await import(`./messages/${locale}.json`)).default as Messages;
}
