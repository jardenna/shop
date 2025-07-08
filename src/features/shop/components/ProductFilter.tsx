import Icon from '../../../components/icons/Icon';
import { IconName } from '../../../types/enums';
import useLanguage from '../../language/useLanguage';

type ProductFilterProps = {
  name?: string;
};

const ProductFilter = ({ name }: ProductFilterProps) => {
  const { language } = useLanguage();
  console.log(name && name);

  return (
    <div className="product-filter">
      <span>{language.filter}</span>
      <Icon iconName={IconName.Filter} title={language.filter} />
    </div>
  );
};

export default ProductFilter;
