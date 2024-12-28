'use client';

import { CartModalWrapper } from 'components/cart/cart-modal-wrapper';
import { useLanguage } from 'components/language-context';
import LogoSquare from 'components/logo-square';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense, useCallback, useState } from 'react';
import MegaMenu from './mega-menu';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';
import { TopHeader } from './top-header';

interface NavbarProps {
  initialMenu: Menu[];
}

export function Navbar({ initialMenu }: NavbarProps) {
  const [menu, setMenu] = useState<Menu[]>(initialMenu);
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
                <div className="ml-2 flex-none text-xl font-skate uppercase tracking-wide text-primary hover:text-primary/80 transition-colors duration-200">
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
