export const getMegaMenuQuery = `
  query getMegaMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
        items {
          title
          url
        }
      }
    }
    collections(first: 10) {
      edges {
        node {
          handle
          title
          description
        }
      }
    }
    products(first: 4, sortKey: BEST_SELLING) {
      edges {
        node {
          handle
          title
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
