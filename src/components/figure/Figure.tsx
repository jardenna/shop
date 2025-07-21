import { ReactNode } from 'react';
import Img from '../Img';
import './_figure.scss';

type FigureProps = {
  alt: string;
  src: string;
  className?: string;
  figcaption?: string | ReactNode;
};

const Figure = ({ figcaption, src, alt, className }: FigureProps) => (
  <figure className={className}>
    {figcaption && <figcaption>{figcaption}</figcaption>}
    <Img className="figure-img" src={`/images/${src}`} alt={alt} />
  </figure>
);

export default Figure;
