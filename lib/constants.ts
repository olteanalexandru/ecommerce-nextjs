export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

interface DefaultCollection {
  handle: string;
  title: string;
  description: string;
}

interface DefaultProduct {
  handle: string;
  title: string;
  featuredImage: {
    url: string;
    altText: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface DefaultMenu {
  defaultCollections: DefaultCollection[];
  defaultProducts: DefaultProduct[];
}

export const defaultMenu: DefaultMenu = {
  defaultCollections: [
    {
      handle: 'all',
      title: 'All Products',
      description: 'Browse all products'
    },
    {
      handle: 'new-arrivals',
      title: 'New Arrivals',
      description: 'Check out our latest products'
    }
  ],
  defaultProducts: [
    {
      handle: 'sample-product',
      title: 'Sample Product',
      featuredImage: {
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNMTAwIDEwNEw4MCA4NEg2MFY2MEg4MEgxMDBIMTIwSDE0MFY4NEgxMjBMMTAwIDEwNFoiIGZpbGw9IiM5Q0EzQUYiLz48L3N2Zz4=',
        altText: 'Sample product placeholder'
      },
      priceRange: {
        minVariantPrice: {
          amount: '0.00',
          currencyCode: 'USD'
        }
      }
    }
  ]
};

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2024-01/graphql.json';
