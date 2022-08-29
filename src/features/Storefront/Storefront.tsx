import { GetStorefrontQueryResponse } from 'types/takeshape';
import { BackgroundImage } from './BackgroundImage/BackgroundImage';
import { Collection } from './Collection/Collection';
import { Collections } from './Collections/Collections';
import { Hero } from './Hero/Hero';
import { Offers } from './Offers/Offers';
import { Sale } from './Sale/Sale';
import { Testimonials } from './Testimonials/Testimonials';
import { BackgroundImageChild, backgroundTypePrefix, StorefrontChild, typePrefix } from './types';

function backgroundImageChildToComponent(component: BackgroundImageChild, index = 0) {
  switch (component.__typename) {
    case `${backgroundTypePrefix}SalesComponent` as const:
      return <Sale key={index} {...component} />;
    case `${backgroundTypePrefix}TestimonialsComponent` as const:
      return <Testimonials key={index} {...component} />;
    default:
      return null;
  }
}

function storefrontChildToComponent() {
  const StorefrontComponent = (component: StorefrontChild, index = 0) => {
    switch (component.__typename) {
      case `${typePrefix}BackgroundImageComponent` as const:
        return (
          <BackgroundImage key={index} {...component}>
            {component.components.map(backgroundImageChildToComponent)}
          </BackgroundImage>
        );
      case `${typePrefix}CollectionsComponent` as const:
        return <Collections key={index} {...component} />;
      case `${typePrefix}HeroComponent` as const:
        return <Hero key={index} {...component} />;
      case `${typePrefix}OffersComponent` as const:
        return <Offers key={index} {...component} />;
      case `${typePrefix}CollectionComponent` as const:
        return <Collection key={index} {...component} />;
      default:
        return null;
    }
  };

  return StorefrontComponent;
}

export interface StorefrontProps {
  storefront: GetStorefrontQueryResponse['storefront']['storefront'];
}

export const Storefront = ({ storefront }: StorefrontProps) => {
  return <div className="bg-background">{storefront.components.map(storefrontChildToComponent())}</div>;
};
