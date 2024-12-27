'use client';

import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Menu, Money } from 'lib/shopify/types';
import Link from 'next/link';
import { Fragment } from 'react';

function formatPrice(price: Money) {
  return `${price.amount} ${price.currencyCode}`;
}

const MenuLink = ({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link
    href={href}
    className={`block text-base font-medium text-neutral-800 dark:text-neutral-200 
    hover:text-primary dark:hover:text-primary transition-colors duration-200 ${className}`}
  >
    {children}
  </Link>
);

export default function MegaMenu({ menu, t }: { menu: Menu[]; t: (key: string) => string }) {
  return (
    <div className="flex items-center gap-8">
      {menu.map((item: Menu) => (
        <Popover key={item.title} className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`${
                  open ? 'text-primary' : 'text-neutral-800 dark:text-neutral-200'
                } group inline-flex items-center gap-x-2 text-sm font-semibold 
                hover:text-primary dark:hover:text-primary transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md px-2 py-1`}
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
                <Popover.Panel className="absolute left-1/2 z-50 mt-3 w-screen max-w-7xl -translate-x-1/2 px-4">
                  <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 backdrop-blur-lg">
                    <div className="relative grid grid-cols-4 gap-x-8 gap-y-10 bg-white/95 dark:bg-black/95 p-8">
                      {/* Categories Section */}
                      <div className="col-span-1">
                        <h3 className="text-sm uppercase tracking-wider text-primary/90 font-semibold mb-6">
                          {t('menu.categories')}
                        </h3>
                        <div className="space-y-5">
                          {item.items?.map((subItem) => (
                            <MenuLink key={subItem.title} href={subItem.path}>
                              {t(`menu.${subItem.title.toLowerCase()}`)}
                            </MenuLink>
                          ))}
                        </div>
                      </div>

                      {/* Collections Section */}
                      <div className="col-span-1">
                        <h3 className="text-sm uppercase tracking-wider text-primary/90 font-semibold mb-6">
                          {t('menu.collections')}
                        </h3>
                        <div className="space-y-5">
                          {item.collections?.edges.slice(0, 6).map((edge) => (
                            <MenuLink key={edge.node.handle} href={`/search/${edge.node.handle}`}>
                              {edge.node.title}
                            </MenuLink>
                          ))}
                        </div>
                      </div>

                      {/* Trending Products Section */}
                      <div className="col-span-2">
                        <h3 className="text-sm uppercase tracking-wider text-primary/90 font-semibold mb-6">
                          {t('menu.trending')}
                        </h3>
                        <div className="grid grid-cols-2 gap-8">
                          {item.products?.edges.slice(0, 2).map((edge) => (
                            <Link
                              key={edge.node.handle}
                              href={`/product/${edge.node.handle}`}
                              className="group"
                            >
                              <div className="aspect-square overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
                                {edge.node.featuredImage && (
                                  <img
                                    src={edge.node.featuredImage.url}
                                    alt={edge.node.featuredImage.altText}
                                    className="h-full w-full object-cover object-center transform transition-all duration-300
                                             group-hover:scale-105 group-hover:opacity-90"
                                  />
                                )}
                              </div>
                              <div className="mt-4">
                                <h4 className="text-base font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-primary">
                                  {edge.node.title}
                                </h4>
                                <p className="mt-2 text-sm font-medium text-primary">
                                  {formatPrice(edge.node.priceRange.minVariantPrice)}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* View All Link */}
                      <div className="col-span-4 border-t border-neutral-200 dark:border-neutral-800 pt-6 mt-6">
                        <Link
                          href={item.path}
                          className="group flex items-center justify-between rounded-xl p-4 
                                   hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-200"
                        >
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 
                                    group-hover:text-primary">
                            {t('common.viewAll')}
                          </p>
                          <span className="text-sm text-primary transform transition-transform duration-200 
                                       group-hover:translate-x-1">→</span>
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
