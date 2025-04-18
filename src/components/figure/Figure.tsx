import { ReactNode } from 'react';
import './_figure.scss';

type FigureProps = {
  alt: string;
  src: string;
  className?: string;
  figcaption?: string | ReactNode;
};

const Figure = ({ figcaption, src, alt, className = '' }: FigureProps) => (
  <figure className={className}>
    {figcaption && <figcaption>{figcaption}</figcaption>}
    <img className="figure-img" src={src} alt={alt} loading="lazy" />
  </figure>
);

export default Figure;
