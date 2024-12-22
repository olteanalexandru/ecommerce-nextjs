'use client';

import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Collection, Menu, Money, Product } from 'lib/shopify/types';
import Link from 'next/link';
import { Fragment } from 'react';

interface MegaMenuProps {
  menu: Menu[];
  collections?: Collection[];
  products?: Product[];
  t: (key: string) => string;
}

function formatPrice(price: Money) {
  return `${price.amount} ${price.currencyCode}`;
}

export default function MegaMenu({ menu, collections, products, t }: MegaMenuProps) {
  return (
    <div className="hidden md:flex items-center gap-6">
      {menu.map((item: Menu) => (
        <Popover key={item.title} className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`${
                  open ? 'text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400'
                } group inline-flex items-center gap-x-1 text-sm font-medium hover:text-black dark:hover:text-neutral-300`}
              >
                {t(`menu.${item.title.toLowerCase()}`)}
                <ChevronDownIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-4 w-4 transition-transform duration-200`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-7xl -translate-x-1/2 transform px-2">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid grid-cols-4 gap-8 bg-white p-8 dark:bg-black">
                      {/* Categories Section */}
                      <div className="col-span-1">
                        <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4">
                          {t('menu.categories')}
                        </h3>
                        <div className="space-y-4">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.path}
                              className="block text-base font-medium text-black dark:text-white hover:text-neutral-500 dark:hover:text-neutral-300"
                            >
                              {t(`menu.${subItem.title.toLowerCase()}`)}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Collections Section */}
                      <div className="col-span-1">
                        <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4">
                          {t('menu.collections')}
                        </h3>
                        <div className="space-y-4">
                          {collections?.slice(0, 6).map((collection) => (
                            <Link
                              key={collection.handle}
                              href={`/search/${collection.handle}`}
                              className="block text-base font-medium text-black dark:text-white hover:text-neutral-500 dark:hover:text-neutral-300"
                            >
                              {collection.title}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Trending Products Section */}
                      <div className="col-span-2">
                        <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4">
                          {t('menu.trending')}
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                          {products?.slice(0, 2).map((product) => (
                            <Link
                              key={product.handle}
                              href={`/product/${product.handle}`}
                              className="group"
                            >
                              <div className="aspect-square overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
                                {product.featuredImage && (
                                  <img
                                    src={product.featuredImage.url}
                                    alt={product.featuredImage.altText}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                  />
                                )}
                              </div>
                              <div className="mt-2">
                                <h4 className="text-sm font-medium text-black dark:text-white">
                                  {product.title}
                                </h4>
                                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                  {formatPrice(product.priceRange.minVariantPrice)}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* View All Link */}
                      <div className="col-span-4 border-t border-neutral-200 dark:border-neutral-700 pt-6 mt-6">
                        <Link
                          href={item.path}
                          className="flex items-center justify-between rounded-lg p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        >
                          <p className="text-sm font-medium text-black dark:text-white">
                            {t('common.viewAll')}
                          </p>
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      ))}
    </div>
  );
}
