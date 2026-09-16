import type { ElementType, ReactNode } from 'react';
import type { ImgProps } from '../Img';
import Picture from '../Picture';
import './_image-background.scss';

type ImageBackgroundProps = ImgProps & {
  children: ReactNode;
  srcSet: string;
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
  srcSet,
}: ImageBackgroundProps) => (
  <Tag
    className={`image-background ${className}`}
    aria-labelledby={ariaLabelledby}
  >
    {!hidePicture && (
      <Picture
        srcSet={srcSet}
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
