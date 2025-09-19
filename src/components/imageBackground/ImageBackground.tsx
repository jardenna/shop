import { ElementType, ReactNode } from 'react';
import Picture from '../Picture';
import './_image-background.scss';

type ImageBackgroundProps = {
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
}: ImageBackgroundProps) => (
  <Tag className={`image-background ${className}`}>
    {!hidePicture && <Picture srcSet={srcSet} alt={alt} src={src} />}
    {children}
  </Tag>
);

export default ImageBackground;
