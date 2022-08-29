import { CollectionBase } from 'types/collection';
import { ProductBase } from 'types/product';
import { GetStorefrontQueryResponse } from 'types/takeshape';

export type StorefrontCollectionItemProduct = ProductBase;

export type StorefrontCollectionItem = {
  product: StorefrontCollectionItemProduct;
};

export type StorefrontCollection = CollectionBase<StorefrontCollectionItem>;

type Storefront = GetStorefrontQueryResponse['storefront']['storefront'];

export const typePrefix = 'WP_Page_Storefront_Components_';
export const backgroundTypePrefix = 'WP_Page_Storefront_Components_BackgroundImageComponent_Components_';

export type StorefrontChild = Storefront['components'][0];
export type BackgroundImageChild = (StorefrontChild & {
  __typename: `${typeof typePrefix}BackgroundImageComponent`;
})['components'][0];

export type StorefrontCollectionComponent = StorefrontChild & {
  __typename?: `${typeof typePrefix}CollectionComponent`;
};
export type StorefrontCollectionComponentProduct =
  StorefrontCollectionComponent['shopifyCollection']['products']['nodes'][0];
