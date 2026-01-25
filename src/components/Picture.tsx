import type { ImgProps } from './Img';
import Img from './Img';

type PictureProps = ImgProps & {
  srcSet: `${string}.avif`;
};

const Picture = ({
  alt,
  srcSet,
  src,
  className,
  priority,
  ratio,
}: PictureProps) => (
  <picture className={className}>
    <source srcSet={srcSet} type="image/avif" />
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
