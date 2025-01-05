'use client';

import { Cart } from 'lib/shopify/types';
import { useEffect, useState } from 'react';
import { CartProvider } from './cart-context';

export function ClientCartProvider({
  children,
  cart
}: {
  children: React.ReactNode;
  cart: Promise<Cart | undefined>;
}) {
  const [cartData, setCartData] = useState<Cart | undefined>(undefined);

  useEffect(() => {
    cart.then((data) => {
      setCartData(data);
    });
  }, [cart]);

  return <CartProvider cart={cartData}>{children}</CartProvider>;
}
