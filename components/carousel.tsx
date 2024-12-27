import { getCollectionProducts } from 'lib/shopify';
import { CarouselClient } from './carousel/client';

export async function Carousel() {
  const products = await getCollectionProducts({ 
    collection: 'hidden-homepage-carousel'
  });
  if (!products?.length) return null;
  return <CarouselClient products={products} />;
}
