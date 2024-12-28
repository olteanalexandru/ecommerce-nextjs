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
    collections(first: 10, sortKey: UPDATED_AT) {
      edges {
        node {
          id
          handle
          title
          description
          products(first: 4) {
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
      }
    }
    featuredProducts: products(
      first: 4,
      sortKey: BEST_SELLING,
      query: "tag:featured"
    ) {
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
    newProducts: products(
      first: 4,
      sortKey: CREATED_AT,
      reverse: true
    ) {
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
