import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1 scrollbar-hide">
      <ul className="flex animate-carousel gap-6 hover:animation-pause">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[35vh] max-h-[325px] w-2/3 max-w-[475px] flex-none md:w-1/3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full group">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="rounded-lg shadow-sm transition-shadow duration-300 group-hover:shadow-md"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
