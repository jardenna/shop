import { ReactNode } from 'react';
import './_image-background.scss';

type PictureTypes = {
  alt: string;
  children: ReactNode;
  src: string;
  srcSet: `${string}.avif`;
  className?: string;
};

const ImageBackground = ({
  children,
  alt,
  srcSet,
  src,
  className = '',
}: PictureTypes) => (
  <div className={`image-background ${className}`}>
    <picture>
      <source srcSet={srcSet} type="image/avif" />
      <img src={src} alt={alt} loading="lazy" />
    </picture>
    <div className="wrapper">{children}</div>
  </div>
);
export default ImageBackground;
