'use client';

import CartModal from 'components/cart/modal';
import { useTranslation } from 'components/language-context';
import { LanguageSwitcher } from 'components/language-switcher';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export function Navbar() {
  const [menu, setMenu] = useState<Menu[]>([]);
  const t = useTranslation;

  useEffect(() => {
    getMenu('next-js-frontend-header-menu').then(menuData => {
      setMenu(menuData);
    });
  }, []);

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} t={t} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {t('common.siteName')}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {t(`menu.${item.title.toLowerCase()}`)}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton t={t} />}>
            <Search t={t} />
          </Suspense>
        </div>
        <div className="flex items-center justify-end gap-2 md:w-1/3">
          <LanguageSwitcher />
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
