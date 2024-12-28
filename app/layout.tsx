import { ClientCartProvider } from 'components/cart/client-cart-provider';
import { Navbar } from 'components/layout/navbar';
import { Providers } from 'components/providers';
import { ThemeProvider } from 'components/theme/theme-provider';
import { GeistSans } from 'geist/font/sans';
import { getServerLocale, getServerMessages } from 'lib/i18n-server';
import { getCart, getMegaMenu } from 'lib/shopify';
import { ensureStartsWith } from 'lib/utils';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
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
  const locale = await getServerLocale();
  const messages = await getServerMessages(locale);
  const menuData = await getMegaMenu('main-menu');

  console.log('Menu Data in Layout:', menuData);

  return (
    <html lang={locale} className={GeistSans.variable}>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Providers locale={locale} messages={messages}>
            <ClientCartProvider cart={Promise.resolve(cart)}>
              <Navbar initialMenu={menuData} />
              <main className="flex-grow">
                {children}
              </main>
            </ClientCartProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
