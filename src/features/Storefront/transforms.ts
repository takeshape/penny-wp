import {
  createImageGetter,
  getCollectionUrl,
  getPrice,
  getProductUrl,
  getProductVariantOptions
} from 'transforms/shopify';
import { GetStorefrontQueryResponse } from 'types/takeshape';
import {
  StorefrontCollection,
  StorefrontCollectionComponent,
  StorefrontCollectionComponentProduct,
  StorefrontCollectionItem,
  StorefrontCollectionItemProduct
} from './types';

function getProduct(shopifyProduct: StorefrontCollectionComponentProduct): StorefrontCollectionItemProduct {
  const getImage = createImageGetter(`Image of ${shopifyProduct.title}`);

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    url: getProductUrl(shopifyProduct.handle),
    name: shopifyProduct.title,
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    featuredImage: getImage(shopifyProduct.featuredImage),
    priceMin: getPrice(shopifyProduct.priceRangeV2.minVariantPrice),
    priceMax: getPrice(shopifyProduct.priceRangeV2.maxVariantPrice),
    variantsCount: shopifyProduct.totalVariants,
    hasOneTimePurchaseOption: !shopifyProduct.requiresSellingPlan,
    hasSubscriptionPurchaseOption: shopifyProduct.sellingPlanGroupCount > 0,
    hasStock: shopifyProduct.totalInventory > 0,
    variantOptions: getProductVariantOptions(shopifyProduct.options)
  };
}

function getCollectionItem(shopifyProduct: StorefrontCollectionComponentProduct): StorefrontCollectionItem {
  return {
    product: getProduct(shopifyProduct)
  };
}

export function getCollection(component: StorefrontCollectionComponent): StorefrontCollection {
  const collection = component?.shopifyCollection;

  if (!collection) {
    return null;
  }

  return {
    id: collection.id,
    url: getCollectionUrl(collection.handle),
    handle: collection.handle,
    name: collection.title,
    description: collection.description,
    descriptionHtml: collection.descriptionHtml,
    items: collection.products.nodes.map((node) => getCollectionItem(node)),
    pageInfo: collection.products.pageInfo
  };
}

export function getStorefront(response: GetStorefrontQueryResponse) {
  const storefront = response?.storefront?.storefront;

  if (!storefront) {
    return null;
  }

  return storefront;
}
