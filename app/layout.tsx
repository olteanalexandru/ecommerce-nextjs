import { ClientCartProvider } from 'components/cart/client-cart-provider';
import { CookieConsentBanner } from 'components/cookie-consent';
import { Navbar } from 'components/layout/navbar';
import { Providers } from 'components/providers';
import { ThemeProvider } from 'components/theme/theme-provider';
import { GeistSans } from 'geist/font/sans';
import { getServerLocale, getServerMessages } from 'lib/i18n-server';
import { getCart, getMegaMenu, getMenu } from 'lib/shopify';
import { ensureStartsWith } from 'lib/utils';
import { Permanent_Marker } from 'next/font/google';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import './globals.css';

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-permanent-marker'
});

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
  const locale = await getServerLocale();
  const messages = await getServerMessages(locale);
  const menuData = await getMegaMenu('main-menu');
  const customerMenuData = await getMenu('customer-account-main-menu');

  console.log('Menu Data in Layout:', menuData);
  console.log('Customer Menu Data in Layout:', customerMenuData);

  return (
    <html lang={locale} className={`${GeistSans.variable} ${permanentMarker.variable}`}>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Providers locale={locale} messages={messages}>
            <ClientCartProvider cart={Promise.resolve(cart)}>
              <Navbar initialMenu={menuData} customerMenu={customerMenuData} />
              <main className="flex-grow">
                {children}
              </main>
              <CookieConsentBanner />
            </ClientCartProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
