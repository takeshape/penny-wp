import { gql } from '@apollo/client';

const StorefrontFragments = gql`
  fragment StorefrontCollection on Shopify_Collection {
    id
    handle
    title
    description
    descriptionHtml
  }

  fragment StorefrontProduct on Shopify_Product {
    id
    handle
    title
    description
    descriptionHtml
    requiresSellingPlan
    featuredImage {
      id
      url(transform: { maxWidth: 300, maxHeight: 300, preferredContentType: WEBP })
      width
      height
      altText
    }
    priceRangeV2 {
      maxVariantPrice {
        currencyCode
        amount
      }
      minVariantPrice {
        currencyCode
        amount
      }
    }
    publishedAt
    totalVariants
    totalInventory
    sellingPlanGroupCount
    options {
      name
      position
      id
      values
    }
  }
`;

export const GetStorefrontQuery = gql`
  ${StorefrontFragments}
  query GetStorefrontQuery {
    storefront: WP_storefront {
      storefront {
        components {
          __typename
          ... on WP_Page_Storefront_Components_HeroComponent {
            primaryText
            secondaryText
            buttonText
            image {
              srcSet
              sourceUrl
              altText
            }
          }
          ... on WP_Page_Storefront_Components_SalesComponent {
            primaryText
            secondaryText
            buttonText
          }
          ... on WP_Page_Storefront_Components_OffersComponent {
            offers {
              name
              description
              href
            }
          }
          ... on WP_Page_Storefront_Components_CollectionComponent {
            collection
            shopifyCollection {
              ...StorefrontCollection
              products(first: 4) {
                pageInfo {
                  endCursor
                  startCursor
                  hasNextPage
                  hasPreviousPage
                }
                nodes {
                  ...StorefrontProduct
                }
              }
            }
          }
          ... on WP_Page_Storefront_Components_CollectionsComponent {
            collections {
              name
              description
              href
              image {
                srcSet
                sourceUrl
                altText
              }
            }
          }
          ... on WP_Page_Storefront_Components_TestimonialsComponent {
            testimonials {
              quote
              attribution
            }
          }
          ... on WP_Page_Storefront_Components_BackgroundImageComponent {
            image {
              srcSet
              sourceUrl
              altText
            }
            components {
              __typename
              ... on WP_Page_Storefront_Components_BackgroundImageComponent_Components_HeroComponent {
                primaryText
                secondaryText
                buttonText
                image {
                  srcSet
                  sourceUrl
                  altText
                }
              }
              ... on WP_Page_Storefront_Components_BackgroundImageComponent_Components_SalesComponent {
                primaryText
                secondaryText
                buttonText
              }
              ... on WP_Page_Storefront_Components_BackgroundImageComponent_Components_OffersComponent {
                offers {
                  name
                  description
                  href
                }
              }
              ... on WP_Page_Storefront_Components_BackgroundImageComponent_Components_CollectionComponent {
                collection
              }
              ... on WP_Page_Storefront_Components_BackgroundImageComponent_Components_CollectionsComponent {
                collections {
                  name
                  description
                  href
                  image {
                    srcSet
                    sourceUrl
                    altText
                  }
                }
              }
              ... on WP_Page_Storefront_Components_BackgroundImageComponent_Components_TestimonialsComponent {
                testimonials {
                  quote
                  attribution
                }
              }
            }
          }
        }
      }
    }
  }
`;
