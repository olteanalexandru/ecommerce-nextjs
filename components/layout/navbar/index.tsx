'use client';

import { CartModalWrapper } from 'components/cart/cart-modal-wrapper';
import { useLanguage } from 'components/language-context';
import LogoSquare from 'components/logo-square';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense, useCallback, useEffect, useState } from 'react';
import CustomerAccountMenu from './customer-account-menu';
import MegaMenu from './mega-menu';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';
import { TopHeader } from './top-header';

interface NavbarProps {
  initialMenu: Menu[];
  customerMenu: Menu[];
}

export function Navbar({ initialMenu, customerMenu }: NavbarProps) {
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

  useEffect(() => {
    const mainHeader = document.getElementById('main-header');
    const topHeader = document.querySelector('.top-header');
    const wrapper = document.querySelector('.header-wrapper') as HTMLElement;
    
    const handleScroll = () => {
      if (!mainHeader || !topHeader || !wrapper) return;
      
      const topHeaderHeight = topHeader.getBoundingClientRect().height;
      const mainHeaderHeight = mainHeader.getBoundingClientRect().height;
      const scrollY = window.scrollY;

      if (scrollY > topHeaderHeight) {
        mainHeader.classList.add('is-fixed');
        wrapper.classList.add('has-fixed-header');
        // Set padding to match header height
        wrapper.style.paddingTop = `${mainHeaderHeight}px`;
      } else {
        mainHeader.classList.remove('is-fixed');
        wrapper.classList.remove('has-fixed-header');
        wrapper.style.paddingTop = '0';
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="header-wrapper">
      <div className="top-header">
        <TopHeader />
      </div>
      
      <div id="main-header" className="w-full z-50 transition-all duration-300 bg-white/90 dark:bg-black/90 backdrop-blur-xl shadow-lg shadow-primary/10 [&.is-fixed]:fixed [&.is-fixed]:top-0 [&.is-fixed]:left-0 [&.is-fixed]:right-0">
        {/* Main Header */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-white/80 to-white/60 dark:from-black/80 dark:to-black/60">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between p-0 lg:px-4 relative h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 pointer-events-none opacity-50" />
              <div className="flex lg:flex-1 py-2">
                <Link
                  href="/"
                  prefetch={true}
                  className="mr-2 flex items-center group"
                >
                  <LogoSquare />
                  <div className="ml-2 flex-none text-lg font-skate uppercase tracking-wide text-primary group-hover:text-primary/80 transition-all duration-300 group-hover:scale-105">
                    {translate('common.siteName')}
                  </div>
                </Link>
              </div>

              <div className="flex flex-1 items-center justify-center px-4">
                <Suspense fallback={<SearchSkeleton t={translate} />}>
                  <Search t={translate} />
                </Suspense>
              </div>

              <div className="flex flex-1 justify-end items-center space-x-4 py-2">
                <Suspense fallback={null}>
                  <CustomerAccountMenu t={translate} menu={customerMenu} />
                </Suspense>
                <CartModalWrapper />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-white/70 to-white/60 dark:from-black/70 dark:to-black/60 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5 pointer-events-none opacity-40" />
          <div className="max-w-7xl mx-auto">
            <div className="hidden md:block">
              <div className="flex justify-center space-x-10 py-1.5">
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
    </div>
  );
}
