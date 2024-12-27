'use client';

import { EyeIcon } from '@heroicons/react/24/outline';

export function QuickViewButton({ onQuickView }: { onQuickView: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onQuickView();
      }}
      className="absolute top-4 right-4 rounded-full bg-white/90 dark:bg-black/90 p-3 
                opacity-0 transition-all duration-300 group-hover:opacity-100 
                hover:scale-110 hover:bg-primary hover:text-white dark:hover:bg-primary
                backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-primary/20
                transform hover:rotate-3"
    >
      <EyeIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
    </button>
  );
}
