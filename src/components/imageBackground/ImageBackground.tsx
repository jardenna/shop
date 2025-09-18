import { ElementType, ReactNode } from 'react';
import './_image-background.scss';

type PictureTypes = {
  alt: string;
  children: ReactNode;
  src: string;
  srcSet: `${string}.avif`;
  as?: ElementType;
  className?: string;
  hidePicture?: boolean;
};

const ImageBackground = ({
  children,
  alt,
  srcSet,
  src,
  as: Tag = 'div',
  hidePicture,
  className = '',
}: PictureTypes) => (
  <Tag className={`image-background ${className}`}>
    {!hidePicture && (
      <picture>
        <source srcSet={srcSet} type="image/avif" />
        <img className="img-fallback" src={src} alt={alt} loading="lazy" />
      </picture>
    )}
    {children}
  </Tag>
);

export default ImageBackground;
