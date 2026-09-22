import { useId } from 'react';
import { useLanguage } from '../../../features/language/useLanguage';
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
import { usePopModal } from '../../popModal/usePopModal';
import SizeGuideModalNew from '../../sizeGuide/SizeGuideModalNew';
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
  onOpenModal?: () => void;
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
  onOpenModal,
  iconClassName,
}: ProductOptionListProps) => {
  const ariaControlsId = useId();
  const { language } = useLanguage();
  const checked = (label: string) =>
    type === 'checkbox' ? values.includes(label) : initialChecked === label;

  const { openModal } = usePopModal();
  console.log(onOpenModal);

  return (
    <div>
      <OptionGroupTitle groupTitle={groupTitle} required={required} />

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

      {modalId && (
        <div className="size-guide-btn">
          <Button
            ariaControls={ariaControlsId}
            ariaHasPopup="dialog"
            variant={BtnVariant.Ghost}
            onClick={() => {
              openModal(modalId);
            }}
          >
            {language.sizeGuide}
          </Button>
        </div>
      )}
      {modalId && (
        <SizeGuideModalNew
          language={language}
          modalId={modalId}
          ariaControls={ariaControlsId}
        />
      )}
    </div>
  );
};

export default ProductOptionList;
