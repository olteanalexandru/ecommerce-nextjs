'use client';

import { CartModalWrapper } from 'components/cart/cart-modal-wrapper';
import { useTranslation } from 'components/language-context';
import { LanguageSwitcher } from 'components/language-switcher';
import LogoSquare from 'components/logo-square';
import { getCollections, getMenu, getProducts } from 'lib/shopify';
import { Collection, Menu, Product } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import MegaMenu from './mega-menu';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export function Navbar() {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [collections, setCollections] = useState<Collection[]>();
  const [products, setProducts] = useState<Product[]>();
  const t = useTranslation;

  useEffect(() => {
    const fetchData = async () => {
      const [menuData, collectionsData, productsData] = await Promise.all([
        getMenu('next-js-frontend-header-menu'),
        getCollections(),
        getProducts({ sortKey: 'BEST_SELLING', reverse: false })
      ]);

      setMenu(menuData);
      setCollections(collectionsData);
      setProducts(productsData);
    };

    fetchData();
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
            <Suspense fallback={null}>
              <MegaMenu menu={menu} collections={collections} products={products} t={t} />
            </Suspense>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton t={t} />}>
            <Search t={t} />
          </Suspense>
        </div>
        <div className="flex items-center justify-end gap-2 md:w-1/3">
          <LanguageSwitcher />
          <CartModalWrapper />
        </div>
      </div>
    </nav>
  );
}
