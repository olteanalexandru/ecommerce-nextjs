'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { GridTileImage } from '../grid/tile';

interface CarouselProps {
  products: Product[];
}

export function CarouselClient({ products }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const productsCount = products?.length || 0;
  
  if (!productsCount) return null;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productsCount);
  }, [productsCount]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + productsCount) % productsCount);
  }, [productsCount]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div 
      className="relative w-full pb-6 pt-1"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-8 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-3 
                 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110 
                 hover:shadow-xl dark:bg-gray-900/80 dark:hover:bg-gray-900
                 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      >
        <ChevronLeftIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-8 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-3 
                 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110 
                 hover:shadow-xl dark:bg-gray-900/80 dark:hover:bg-gray-900
                 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      >
        <ChevronRightIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      </button>

      {/* Carousel Content */}
      <div className="relative h-[450px] w-full overflow-hidden bg-transparent">
        <ul 
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
        >
          {products.map((product) => (
            <li
              key={product.handle}
              className="relative h-full w-full flex-none px-4 py-6 transition-transform duration-300"
            >
              <Link 
                href={`/product/${product.handle}`} 
                className="relative block h-full w-full transform transition-all duration-300 hover:scale-[1.02]"
              >
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 100vw, (min-width: 768px) 100vw, 100vw"
                  className="rounded-lg transition-all duration-300 object-contain bg-transparent 
                           group-hover:brightness-105 dark:group-hover:brightness-110"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Progress Indicators */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/10 to-transparent 
                      dark:from-black/30 pb-8 pt-16">
          <div className="flex justify-center gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none 
                          focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                          ${index === currentIndex 
                            ? 'w-8 bg-blue-600 dark:bg-blue-400' 
                            : 'w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                          }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
