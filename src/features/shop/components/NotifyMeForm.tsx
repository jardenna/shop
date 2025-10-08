import type { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import FieldSet from '../../../components/fieldset/FieldSet';
import ControlGroupList from '../../../components/formElements/controlGroup/ControlGroupList';
import Input from '../../../components/formElements/Input';
import type { InputChangeHandler } from '../../../types/types';
import useLanguage from '../../language/useLanguage';

type NotifyMeFormProps = {
  errors: Record<string, string>;
  onChange: InputChangeHandler;
  options: string[];
  values: { email: string; sizes: Size[] };
  sizesIsRequered?: boolean;
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
        <FieldSet legendText={language.sizes}>
          <p>
            {language.missingYourSize}? {language.notifyMeMessage}.
          </p>
          <ControlGroupList
            options={options}
            type="checkbox"
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
        </FieldSet>
      ) : (
        <p>{language.temporarilyOutOfStockText}.</p>
      )}
      <FieldSet legendText={language.email}>
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
      </FieldSet>
    </div>
  );
};

export default NotifyMeForm;
