import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import CheckboxControls from '../../../components/formElements/controlGroup/CheckboxControls';
import Input from '../../../components/formElements/Input';
import { ChangeInputType } from '../../../types/types';
import useLanguage from '../../language/useLanguage';

type NotifyMeFormProps = {
  errors: Record<string, string>;
  options: string[];
  values: { email: string; sizes: Size[] };
  sizesIsRequered?: boolean;
  onChange: (event: ChangeInputType) => void;
};

const NotifyMeForm = ({
  options,
  values,
  errors,
  onChange,
  sizesIsRequered,
}: NotifyMeFormProps) => {
  const { language } = useLanguage();

  return (
    <div className="notify">
      {sizesIsRequered ? (
        <>
          <p>
            {language.missingYourSize}? {language.notifyMeMessage}.
          </p>
          <CheckboxControls
            options={options}
            autoFocus
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
        autoFocus={!sizesIsRequered}
        errorText={language[errors.email]}
      />
    </div>
  );
};

export default NotifyMeForm;
