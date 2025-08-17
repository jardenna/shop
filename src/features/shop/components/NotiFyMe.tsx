import CheckboxControls from '../../../components/formElements/controlGroup/CheckboxControls';
import Input from '../../../components/formElements/Input';
import { SecondaryActionBtnProps } from '../../../components/modal/Modal';
import ModalContainer from '../../../components/modal/ModalContainer';
import { KeyValuePair } from '../../../hooks/useFormValidation';
import { InitialNotifyValues } from '../../../pages/SingleProductPage';
import { BtnType, BtnVariant, SizeVariant } from '../../../types/enums';
import type { ChangeInputType, FormEventType } from '../../../types/types';
import useLanguage from '../../language/useLanguage';

type NotifiMeProps = {
  errors: KeyValuePair<string>;
  id: string;
  options: string[];
  values: InitialNotifyValues;
  sizesIsRequered?: boolean;
  onChange: (event: ChangeInputType) => void;
  onSubmit: (event: FormEventType) => void;
};

const NotiFyMe = ({
  onSubmit,
  options,
  onChange,
  values,
  id,
  errors,
  sizesIsRequered,
}: NotifiMeProps) => {
  const { language } = useLanguage();

  const primaryActionBtn = {
    onSubmit,
    label: language.notiftyMe,
    buttonType: BtnType.Submit,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  return (
    <ModalContainer
      triggerModalBtnContent="Missing sizes"
      triggerModalBtnVariant={BtnVariant.Ghost}
      id={id}
      primaryActionBtn={primaryActionBtn}
      secondaryActionBtn={secondaryActionBtn}
      modalSize={SizeVariant.Sm}
      modalHeaderText={
        sizesIsRequered
          ? language.currentlyUnavailableSizes
          : language.temporarilyOutOfStock
      }
    >
      {sizesIsRequered ? (
        <>
          <p>
            {language.missingYourSize}? {language.notiftyMeMessage}.
          </p>
          <CheckboxControls
            options={options}
            name="sizes"
            onChange={onChange}
            values={values.sizes}
            required
            groupTitle={{
              title: language.sizes,
              id: 'missing-sizes',
              errorText: language[errors.sizes],
            }}
          />
        </>
      ) : (
        <p>{language.temporarilyOutOfStockText}.</p>
      )}
      <Input
        name="email"
        id="email"
        value={values.email}
        labelText={language.email}
        onChange={onChange}
        required
        type="email"
        errorText={language[errors.email]}
      />
    </ModalContainer>
  );
};

export default NotiFyMe;
