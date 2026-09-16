import { Link } from 'react-router';
import { ShopPath } from '../layout/nav/enums';

const CustomerServiceLink = () => (
  <Link className="link-text" to={`/${ShopPath.CustomerService}`}>
    customer service team
  </Link>
);

export default CustomerServiceLink;
