'use client';

import { Menu } from 'lib/shopify/types';
import Link from 'next/link';

interface CustomerAccountMenuProps {
  t: (key: string) => string;
  menu: Menu[];
}

export default function CustomerAccountMenu({ t, menu }: CustomerAccountMenuProps) {

  return (
    <div className="flex items-center space-x-4">
      {menu.map((item) => (
        <Link
          key={item.title}
          href={item.path}
          className="text-sm font-semibold text-gray-700 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white"
        >
          {t(`menu.${item.title.toLowerCase()}`)}
        </Link>
      ))}
    </div>
  );
}

declare global {
  interface Window {
    __INITIAL_CUSTOMER_MENU_DATA__: Menu[];
  }
}
