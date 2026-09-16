import type { ElementType, ReactNode } from 'react';
import type { ImgProps } from '../Img';
import Picture from '../Picture';
import './_image-background.scss';

type ImageBackgroundProps = ImgProps & {
  children: ReactNode;
  srcSetNew: string;
  ariaLabelledby?: string;
  as?: ElementType;
  hidePicture?: boolean;
};

const ImageBackground = ({
  children,
  alt,
  src,
  as: Tag = 'div',
  hidePicture,
  className = '',
  ariaLabelledby,
  priority,
  ratio,
  srcSetNew,
}: ImageBackgroundProps) => (
  <Tag
    className={`image-background ${className}`}
    aria-labelledby={ariaLabelledby}
  >
    {!hidePicture && (
      <Picture
        srcSetNew={srcSetNew}
        alt={alt}
        src={src}
        priority={priority}
        ratio={ratio}
      />
    )}
    {children}
  </Tag>
);

export default ImageBackground;
