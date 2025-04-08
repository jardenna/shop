import { Link } from 'react-router';

type TopContainerProps = {
  heading: string;
  linkText: string;
  linkTo: string;
};

const TopContainer = ({ heading, linkTo, linkText }: TopContainerProps) => (
  <div className="top-container ">
    <h1>{heading}</h1>
    <Link to={linkTo}>{linkText}</Link>
  </div>
);

export default TopContainer;
