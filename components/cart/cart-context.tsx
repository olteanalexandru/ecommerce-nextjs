'use client';

import { Cart } from 'lib/shopify/types';
import { createContext, useContext, useState } from 'react';

interface CartContext {
  cart: Cart | undefined;
  setCart: (cart: Cart | undefined) => void;
}

const CartContext = createContext<CartContext | undefined>(undefined);

export function CartProvider({
  children,
  cart: initialCart
}: {
  children: React.ReactNode;
  cart: Cart | undefined;
}) {
  const [cart, setCart] = useState<Cart | undefined>(initialCart);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
