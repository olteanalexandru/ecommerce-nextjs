'use client';

import { useCart } from './cart-context';
import CartModal from './modal';

export function CartModalWrapper() {
  try {
    // Try to access cart context
    useCart();
    return <CartModal />;
  } catch {
    // Return null if cart context is not available yet
    return null;
  }
}
