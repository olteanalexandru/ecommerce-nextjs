'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('✨ Welcome to Our Modern Shop', {
        id: 'welcome-toast',
        duration: 8000,
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        className: 'animate-fade-in',
        description: (
          <>
            Discover our curated collection of premium products with lightning-fast checkout.{' '}
            <a
              href="https://vercel.com/templates/next.js/nextjs-commerce"
              className="text-blue-500 hover:text-blue-600 transition-colors font-medium hover:underline"
              target="_blank"
            >
              Learn more
            </a>
          </>
        )
      });
    }
  }, []);

  return null;
}
