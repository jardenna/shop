import type { ImgProps } from './Img';
import Img from './Img';

type PictureProps = ImgProps & {
  srcSet: string;
};

const Picture = ({
  alt,
  src,
  className,
  priority,
  srcSet,
  ratio,
}: PictureProps) => (
  <picture className={className}>
    <source srcSet={`${srcSet}.avif`} type="image/avif" />
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
