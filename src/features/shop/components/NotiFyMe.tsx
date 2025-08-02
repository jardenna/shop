import CheckboxControls from '../../../components/formElements/controlGroup/CheckboxControls';
import Input from '../../../components/formElements/Input';
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
}: NotifiMeProps) => {
  const { language } = useLanguage();

  const primaryActionBtn = {
    onSubmit,
    label: language.notiftyMe,
    buttonType: BtnType.Submit,
  };

  return (
    <ModalContainer
      triggerModalBtnContent="Missing sizes"
      triggerModalBtnVariant={BtnVariant.Ghost}
      id={id}
      primaryActionBtn={primaryActionBtn}
      modalSize={SizeVariant.Sm}
      modalHeaderText={language.currentlyUnavailableSizes}
    >
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
