import { ElementType, ReactNode } from 'react';
import type { ImgProps } from '../Img';
import Picture from '../Picture';
import './_image-background.scss';

type ImageBackgroundProps = ImgProps & {
  children: ReactNode;
  srcSet: `${string}.avif`;
  as?: ElementType;
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
