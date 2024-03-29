import NextImage from 'components/NextImage';
import { StorefrontChild, typePrefix } from 'features/Storefront/types';
import { PropsWithChildren } from 'react';

type BackgroundImageProps = StorefrontChild & { __typename: `${typeof typePrefix}BackgroundImageComponent` };

export const BackgroundImage = ({ image, children }: PropsWithChildren<BackgroundImageProps>) => {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative background image and gradient */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 max-w-7xl mx-auto overflow-hidden xl:px-8">
          <div className="w-full h-full">
            <NextImage
              src={image.sourceUrl}
              alt={image.altText ?? ''}
              className="w-full h-full object-center object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-background bg-opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background" />
      </div>
      {children}
    </div>
  );
};
