import { ClientCartProvider } from 'components/cart/client-cart-provider';
import { LanguageProvider } from 'components/language-context';
import { Navbar } from 'components/layout/navbar';
import { ThemeProvider } from 'components/theme/theme-provider';
import { WelcomeToast } from 'components/welcome-toast';
import { GeistSans } from 'geist/font/sans';
import { getServerLocale, getServerMessages } from 'lib/i18n-server';
import { getCart } from 'lib/shopify';
import { ensureStartsWith } from 'lib/utils';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cartId = (await cookies()).get('cartId')?.value;
  const cart = cartId ? await getCart(cartId) : undefined;
  
  // Get locale and translations
  const locale = await getServerLocale();
  const messages = await getServerMessages(locale);

  return (
    <html lang={locale} className={GeistSans.variable}>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col animate-fade-in selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none opacity-10 dark:opacity-5">
          <div className="w-[800px] h-[800px] rotate-45 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <ThemeProvider>
          <ClientCartProvider cart={Promise.resolve(cart)}>
            <LanguageProvider locale={locale} messages={messages}>
            <Navbar />
            <main className="flex-grow relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNCAxNGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNHoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvZz48L3N2Zz4=')] bg-repeat opacity-[0.015] dark:opacity-[0.02] -z-10" />
              {children}
              <Toaster closeButton />
              <WelcomeToast />
            </main>
            </LanguageProvider>
          </ClientCartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
