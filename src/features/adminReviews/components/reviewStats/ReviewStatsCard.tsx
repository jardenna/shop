import { ReactNode } from 'react';
import Cart from '../../../../components/carts/Cart';

interface ReviewStatsCardProps {
  children: ReactNode;
  heading: string;
  text: number;
}

const ReviewStatsCard = ({ heading, children, text }: ReviewStatsCardProps) => (
  <Cart>
    <h2 className="review-stats-heading">{heading}</h2>
    <div>
      <p className="review-stats-info">{text}</p>
      {children}
    </div>
  </Cart>
);

export default ReviewStatsCard;
