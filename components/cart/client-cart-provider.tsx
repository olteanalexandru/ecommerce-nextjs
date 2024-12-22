'use client';

import { Cart } from 'lib/shopify/types';
import { useEffect, useState } from 'react';
import { CartProvider as BaseCartProvider } from './cart-context';

export function ClientCartProvider({
  children,
  cart
}: {
  children: React.ReactNode;
  cart: Promise<Cart | undefined>;
}) {
  const [resolvedCart, setResolvedCart] = useState<Cart | undefined>(undefined);

  useEffect(() => {
    cart.then(result => {
      setResolvedCart(result);
    });
  }, [cart]);

  // Show children without cart functionality while loading
  if (!resolvedCart) {
    return (
      <div className="h-full">
        {children}
      </div>
    );
  }

  return (
    <BaseCartProvider initialCart={resolvedCart}>
      {children}
    </BaseCartProvider>
  );
}
