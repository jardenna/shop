import { ReactNode } from 'react';
import './_image-background.scss';

type PictureTypes = {
  alt: string;
  children: ReactNode;
  src: string;
  srcSet: `${string}.avif`;
  className?: string;
  hidePicture?: boolean;
};

const ImageBackground = ({
  children,
  alt,
  srcSet,
  src,
  hidePicture,
  className = '',
}: PictureTypes) => (
  <div className={`image-background ${className}`}>
    {!hidePicture && (
      <picture>
        <source srcSet={srcSet} type="image/avif" />
        <img className="img-fallback" src={src} alt={alt} loading="lazy" />
      </picture>
    )}
    {children}
  </div>
);

export default ImageBackground;
