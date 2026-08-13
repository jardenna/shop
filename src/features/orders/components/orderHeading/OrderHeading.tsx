import './_order-heading.scss';

interface OrderHeadingProps {
  heading: string;
  variant?: 'underline';
}

const OrderHeading = ({ heading, variant }: OrderHeadingProps) => (
  <h2 className={`order-heading ${variant}`}>{heading}</h2>
);

export default OrderHeading;
