import './_section-heading.scss';

interface SectionHeadingProps {
  heading: string;
  variant?: string;
}

const SectionHeading = ({ heading, variant = '' }: SectionHeadingProps) => (
  <h2 className={`order-heading ${variant}`}>{heading}</h2>
);

export default SectionHeading;
