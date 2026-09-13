import { useId } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { useLanguage } from '../../../features/language/useLanguage';
import { toggleModal } from '../../../features/modalSlice';
import OptionGroupTitle from '../../../features/shop/components/productLists/OptionGroupTitle';
import { BtnVariant, IconName } from '../../../types/enums';
import type {
  ControlInputType,
  InputChangeHandler,
  OptionGroupHeading,
  SizeVariant,
} from '../../../types/types';
import { colorMap } from '../../../utils/colorUtils';
import { translateKey } from '../../../utils/utils';
import Button from '../../Button';
import SizeGuideModal from '../../sizeGuide/SizeGuideModal';
import InputInfo from '../InputInfo';
import ControlGroupInput from './ProductOptionInput';
import './_product-option-list.scss';

export interface BaseControlGroupProps {
  groupTitle: OptionGroupHeading;
  name: string;
  onChange: InputChangeHandler;
  type: ControlInputType;
  autoFocus?: boolean;
  className?: string;
  iconClassName?: string;
  iconName?: IconName;
  iconSize?: string;
  inputInfo?: string;
  required?: boolean;
  variant?: SizeVariant;
}

interface ProductOptionListProps extends BaseControlGroupProps {
  options: string[];
  disabledList?: string[];
  initialChecked?: string;
  modalId?: string;
  values?: string[];
}

const ProductOptionList = ({
  name,
  options,
  groupTitle,
  required,
  inputInfo,
  values = [],
  initialChecked,
  disabledList,
  onChange,
  iconName,
  className = 'size-list',
  autoFocus,
  variant = 'medium',
  iconSize,
  type,
  modalId,
  iconClassName,
}: ProductOptionListProps) => {
  const ariaControlsId = useId();
  const dispatch = useAppDispatch();
  const { language } = useLanguage();
  const checked = (label: string) =>
    type === 'checkbox' ? values.includes(label) : initialChecked === label;

  const handleOpenModal = () => {
    if (modalId) {
      dispatch(toggleModal(modalId));
    }
  };

  return (
    <div>
      <OptionGroupTitle groupTitle={groupTitle} required={required} />
      <Button
        variant={BtnVariant.Ghost}
        onClick={handleOpenModal}
        ariaControls={ariaControlsId}
        ariaHasPopup="dialog"
      >
        {language.sizeGuide}
      </Button>

      <ul
        className={`control-list product-option-list ${className}`}
        aria-labelledby={groupTitle.id}
      >
        {options.map((label, index) => (
          <li key={label} className="control-item">
            <ControlGroupInput
              iconSize={iconSize}
              autoFocus={autoFocus && index === 0}
              iconName={iconName}
              fill={iconName ? colorMap[label] : ''}
              id={`${name}-${index}`}
              type={type}
              name={name}
              value={label}
              checked={checked(label)}
              ariaLabel={translateKey(label, language)}
              disabled={
                disabledList ? !disabledList.includes(label) : undefined
              }
              onChange={onChange}
              label={label}
              variant={variant}
              iconClassName={iconClassName}
              groupTitle={{
                id: '',
                title: '',
                errorText: undefined,
              }}
            />
          </li>
        ))}
      </ul>
      {inputInfo && <InputInfo inputInfo={inputInfo} />}
      {modalId && <SizeGuideModal language={language} id={modalId} />}
    </div>
  );
};

export default ProductOptionList;
