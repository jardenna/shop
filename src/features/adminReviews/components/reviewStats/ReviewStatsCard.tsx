import { ReactNode } from 'react';

interface ReviewStatsCardProps {
  children: ReactNode;
  heading: string;
  text: number;
}

const ReviewStatsCard = ({ heading, children, text }: ReviewStatsCardProps) => (
  <section className="review-stats-card">
    <h2 className="review-stats-heading">{heading}</h2>
    <div className="review-stats-info">
      <p className="review-stats-text">{text}</p>
      {children}
    </div>
  </section>
);

export default ReviewStatsCard;
