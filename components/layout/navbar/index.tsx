'use client';

import { CartModalWrapper } from 'components/cart/cart-modal-wrapper';
import { useLanguage } from 'components/language-context';
import LogoSquare from 'components/logo-square';
import { defaultMenu } from 'lib/constants';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense, useCallback, useEffect, useState } from 'react';
import MegaMenu from './mega-menu';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';
import { TopHeader } from './top-header';

export function Navbar() {
  const [menu, setMenu] = useState<Menu[]>([{
    title: 'Shop',
    path: '/search',
    items: [],
    collections: {
      edges: defaultMenu.defaultCollections.map(collection => ({
        node: collection
      }))
    },
    products: {
      edges: defaultMenu.defaultProducts.map(product => ({
        node: product
      }))
    }
  }]);
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
        
        if (isMounted && menuData && menuData.length > 0) {
          setMenu(menuData);
        }
      } catch (error) {
        console.error('Error fetching menu data:', error);
        // Keep using the default menu data set in useState
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg shadow-primary/5">
      <TopHeader />
      
      {/* Main Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white/75 dark:bg-black/75">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between p-4 lg:px-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none opacity-50" />
            <div className="flex lg:flex-1">
              <Link
                href="/"
                prefetch={true}
                className="mr-2 flex items-center"
              >
                <LogoSquare />
                <div className="ml-2 flex-none text-xl font-skate uppercase tracking-wide text-foreground hover:text-primary transition-colors duration-200">
                  {translate('common.siteName')}
                </div>
              </Link>
            </div>

            <div className="flex flex-1 justify-center px-4">
              <Suspense fallback={<SearchSkeleton t={translate} />}>
                <Search t={translate} />
              </Suspense>
            </div>

            <div className="flex flex-1 justify-end">
              <CartModalWrapper />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white/75 dark:bg-black/75 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none opacity-30" />
        <div className="max-w-7xl mx-auto">
          <div className="hidden md:block">
            <div className="flex justify-center space-x-12 py-3">
              <Suspense fallback={null}>
                <MegaMenu menu={menu} t={translate} />
              </Suspense>
            </div>
          </div>
          <div className="md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} t={translate} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
