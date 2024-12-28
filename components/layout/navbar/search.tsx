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
    <Form action="/search" className="max-w-[550px] relative w-full lg:w-80 xl:w-full group">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="q"
        placeholder={t('search.placeholder')}
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="w-full rounded-full border border-neutral-200/80 bg-white/60 px-4 py-2.5 
                 font-sans text-sm text-black backdrop-blur-xl placeholder:text-neutral-500
                 transition-all duration-300 ease-in-out
                 hover:border-neutral-300 hover:bg-white/80
                 focus:border-primary/50 focus:bg-white focus:shadow-[0_0_0_1px_rgba(var(--primary),0.2)]
                 focus:outline-none
                 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white 
                 dark:placeholder:text-neutral-400 dark:hover:border-neutral-700
                 dark:hover:bg-neutral-950/70 dark:focus:border-primary/50
                 dark:focus:bg-neutral-950/90"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 w-4 text-neutral-500 transition-colors duration-200
                                      group-hover:text-neutral-600 dark:text-neutral-400
                                      dark:group-hover:text-neutral-300" />
      </div>
    </Form>
  );
}

export function SearchSkeleton({ t }: SearchProps) {
  return (
    <form className="max-w-[550px] relative w-full lg:w-80 xl:w-full">
      <div className="animate-pulse">
        <div className="w-full rounded-full border border-neutral-200/80 bg-neutral-100/80 
                      h-[38px] dark:border-neutral-800 dark:bg-neutral-800/50" />
      </div>
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 w-4 text-neutral-400 dark:text-neutral-600" />
      </div>
    </form>
  );
}
