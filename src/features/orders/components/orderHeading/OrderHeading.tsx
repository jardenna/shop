import './_order-heading.scss';

interface OrderHeadingProps {
  heading: string;
  variant?: string;
}

const OrderHeading = ({ heading, variant = '' }: OrderHeadingProps) => (
  <h2 className={`order-heading ${variant}`}>{heading}</h2>
);

export default OrderHeading;
