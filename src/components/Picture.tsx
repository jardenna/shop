import Img from './Img';

type PictureProps = {
  alt: string;
  src: string;
  srcSet: `${string}.avif`;
  className?: string;
};

const Picture = ({ alt, srcSet, src, className }: PictureProps) => (
  <picture className={className}>
    <source srcSet={srcSet} type="image/avif" />
    <Img className="img-fallback" src={src} alt={alt} />
  </picture>
);

export default Picture;
