import CheckboxList from '../../../components/formElements/controlGroup/CheckboxControls';
import ModalContainer from '../../../components/modal/ModalContainer';
import { BtnType, BtnVariant, SizeVariant } from '../../../types/enums';
import type { ChangeInputType, FormEventType } from '../../../types/types';
import useLanguage from '../../language/useLanguage';

type NotifiMeProps = {
  options: string[];
  values: string[];
  onChange: (event: ChangeInputType) => void;
  onSubmit: (event: FormEventType) => void;
};
const NotiFyMe = ({ onSubmit, options, onChange, values }: NotifiMeProps) => {
  const { language } = useLanguage();

  const primaryActionBtn = {
    onSubmit,
    label: language.notiftyMe,
    buttonType: BtnType.Submit,
  };

  return (
    <div>
      <ModalContainer
        triggerModalBtnContent="Notify me when missing sizes are back in stock"
        triggerModalBtnVariant={BtnVariant.Ghost}
        id="sizes"
        primaryActionBtn={primaryActionBtn}
        modalSize={SizeVariant.Sm}
        modalHeaderText={`${language.size}  ${language.currentlyUnavailable}`}
      >
        <CheckboxList
          options={options}
          name="sizes"
          onChange={onChange}
          values={values}
        />
      </ModalContainer>
    </div>
  );
};

export default NotiFyMe;
