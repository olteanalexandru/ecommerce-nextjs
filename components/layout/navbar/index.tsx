'use client';

import { CartModalWrapper } from 'components/cart/cart-modal-wrapper';
import { useLanguage } from 'components/language-context';
import { LanguageSwitcher } from 'components/language-switcher';
import LogoSquare from 'components/logo-square';
import { ThemeToggle } from 'components/theme/theme-toggle';
import { getMenu } from 'lib/shopify';
import { Collection, Menu, Product } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense, useCallback, useEffect, useState } from 'react';
import MegaMenu from './mega-menu';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export function Navbar() {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [collections, setCollections] = useState<Collection[]>();
  const [products, setProducts] = useState<Product[]>();
  const { messages } = useLanguage();
  
  const translate = useCallback((key: string) => {
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
  }, [messages]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const menuData = await getMenu('next-js-frontend-header-menu');
        
        if (isMounted) {
          setMenu(menuData);
          // The collections and products are already included in the menu query response
          // We'll extract them from menuData when needed in the MegaMenu component
        }
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} t={translate} />
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
            <div className="ml-2 flex-none text-sm font-medium uppercase text-blue-700 dark:text-white md:hidden lg:block">
              {translate('common.siteName')}
            </div>
          </Link>
          {menu.length ? (
            <Suspense fallback={null}>
              <MegaMenu menu={menu} collections={collections} products={products} t={translate} />
            </Suspense>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton t={translate} />}>
            <Search t={translate} />
          </Suspense>
        </div>
        <div className="flex items-center justify-end gap-2 md:w-1/3">
          <LanguageSwitcher />
          <ThemeToggle />
          <CartModalWrapper />
        </div>
      </div>
    </nav>
  );
}
