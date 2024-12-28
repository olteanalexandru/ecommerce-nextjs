'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';

interface SearchProps {
  t: (key: string) => string;
}

export default function Search({ t }: SearchProps) {
  const searchParams = useSearchParams();

  return (
    <Form action="/search" className="max-w-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="q"
        placeholder={t('search.placeholder')}
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="w-full rounded-full border border-neutral-200 bg-white/80 px-4 py-2 font-sans text-sm text-black backdrop-blur-xl placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-black/80 dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </Form>
  );
}

export function SearchSkeleton({ t }: SearchProps) {
  return (
    <form className="max-w-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder={t('search.placeholder')}
        className="w-full rounded-full border border-neutral-200 bg-white/80 px-4 py-2 font-sans text-sm text-black backdrop-blur-xl placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-black/80 dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
