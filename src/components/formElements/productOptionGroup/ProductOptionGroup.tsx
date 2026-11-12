import { useId } from 'react';
import { useLanguage } from '../../../features/language/useLanguage';
import { BtnVariant, IconName } from '../../../types/enums';
import type {
  ControlInputType,
  InputChangeHandler,
  OptionGroupHeading,
  SizeVariant,
} from '../../../types/types';
import TriggerModalButton from '../../Modal/TriggerModalButton';
import SizeGuideModal from '../../sizeGuide/SizeGuideModal';
import InputInfo from '../InputInfo';
import ProductOptionGroupTitle from './ProductOptionGroupTitle';
import ProductOptionList from './ProductOptionList';

export interface BaseProductOptionProps {
  name: string;
  onChange: InputChangeHandler;
  type: ControlInputType;
  autoFocus?: boolean;
  iconClassName?: string;
  iconName?: IconName;
  iconSize?: string;
  variant?: SizeVariant;
}

interface ProductOptionGroupProps extends BaseProductOptionProps {
  groupTitle: OptionGroupHeading;
  options: string[];
  className?: string;
  disabledList?: string[];
  initialChecked?: string;
  inputInfo?: string;
  modalId?: string;
  required?: boolean;
  values?: string[];
}

const ProductOptionGroup = ({
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
}: ProductOptionGroupProps) => {
  const ariaControls = useId();
  const { language } = useLanguage();
  const checked = (label: string) =>
    type === 'checkbox' ? values.includes(label) : initialChecked === label;

  return (
    <div>
      <ProductOptionGroupTitle groupTitle={groupTitle} required={required} />
      <ProductOptionList
        disabledList={disabledList}
        checked={checked}
        type={type}
        name={name}
        onChange={onChange}
        options={options}
        iconClassName={iconClassName}
        autoFocus={autoFocus}
        className={className}
        iconSize={iconSize}
        iconName={iconName}
        variant={variant}
      />

      {inputInfo && <InputInfo inputInfo={inputInfo} />}

      {modalId && (
        <div className="size-guide-btn">
          <TriggerModalButton
            ariaControls={ariaControls}
            variant={BtnVariant.Ghost}
            modalId={modalId}
          >
            {language.sizeGuide}
          </TriggerModalButton>
        </div>
      )}
      {modalId && (
        <SizeGuideModal
          language={language}
          modalId={modalId}
          ariaControls={ariaControls}
        />
      )}
    </div>
  );
};

export default ProductOptionGroup;
