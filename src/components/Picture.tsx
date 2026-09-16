import type { ImgProps } from './Img';
import Img from './Img';

type PictureProps = ImgProps & {
  srcSetNew: string;
};

const Picture = ({
  alt,
  src,
  className,
  priority,
  srcSetNew,
  ratio,
}: PictureProps) => (
  <picture className={className}>
    <source srcSet={`${srcSetNew}.avif`} type="image/avif" />
    <Img
      className="img-fallback"
      src={src}
      alt={alt}
      priority={priority}
      ratio={ratio}
    />
  </picture>
);

export default Picture;
