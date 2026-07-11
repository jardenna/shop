import Icon from '../../../components/icons/Icon';
import { IconName } from '../../../types/enums';
import { minInStock } from '../../../utils/utils';
import { useLanguage } from '../../language/useLanguage';

type InStockProps = {
  stock: number;
  minStock?: number;
};

const InStock = ({ stock, minStock = minInStock }: InStockProps) => {
  const { language } = useLanguage();

  const getStockStatus = ({ stock }: InStockProps) => {
    if (stock === 0) {
      return {
        icon: IconName.Error,
        message: language.outOfStock,
      };
    }

    if (stock <= minStock) {
      return {
        icon: IconName.Warning,
        message: `${language.lowStock}: ${stock} ${language.left}`,
      };
    }

    return {
      icon: IconName.Success,
      message: `${language.inStock}: ${stock}`,
    };
  };

  const status = getStockStatus({ stock });

  return (
    <div className="in-stock">
      <Icon iconName={status.icon} /> {status.message}
    </div>
  );
};

export default InStock;
