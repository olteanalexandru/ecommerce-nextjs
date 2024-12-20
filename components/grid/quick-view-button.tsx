'use client';

import { EyeIcon } from '@heroicons/react/24/outline';

export function QuickViewButton({ onQuickView }: { onQuickView: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onQuickView();
      }}
      className="absolute top-2 right-2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-black/80"
    >
      <EyeIcon className="h-5 w-5" />
    </button>
  );
}
