import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { PromoCode } from '../../../app/api/apiTypes/promoCodeApiTypes';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { useLanguage } from '../../language/useLanguage';

interface PromoCodeFormProps {
  id: string | null;
  promoCode: PromoCode | null;
  onReset: () => void;
}

const PromoCodeForm = ({ promoCode, id, onReset }: PromoCodeFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Helper functions
  const handleGoback = () => {
    navigate(-1);
  };

  const initialState = {
    code: promoCode?.code ?? '',
    label: promoCode?.label ?? '',
    percent: promoCode?.percent ?? null,
    startsAt: promoCode?.startsAt ?? '',
  };

  // Hooks
  const { onChange, values, onSubmit, isFormDirty } = useFormValidation({
    initialState,
  });

  // const { onAddToast } = useToast();

  // // Redux hooks
  // const [updateSubCategory, { isLoading }] = useUpdatePromoCodeMutation();
  // const [createSubCategory, { isLoading: isCreateLoading }] =
  //   useCreatePromoCodeMutation();

  // // Submit handler
  // async function handleSubmitCategory() {
  //   if (!isFormDirty) {
  //     onAddToast({
  //       message: language.noChanges,
  //     });
  //     return;
  //   }

  //   if (id) {
  //     await updateSubCategory({
  //       id,
  //       subCategory: {
  //         ...values,
  //         category: values.category,
  //         scheduledDate: selectedDate,
  //       },
  //     }).unwrap();

  //     onAddToast({
  //       message: language.categoryUpdated,
  //     });
  //   } else {
  //     await createSubCategory({
  //       ...values,
  //       category: values.category,
  //       scheduledDate: selectedDate,
  //     }).unwrap();
  //   }

  //   onAddToast({
  //     message: popupMessage,
  //   });

  //   navigate(AdminPath.AdminSubCategories);
  // }

  // const selectedCategoryOption = parentCategoriesOptions.find(
  //   (option) => option.value === values.category,
  // );

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => {
        onReset();
      }}
    >
      <Form
        disabled={!!id && !isFormDirty}
        onSubmit={onSubmit}
        submitBtnLabel={id ? language.save : language.create}
        cancelBtnProps={{
          onCancel: handleGoback,
        }}
      >
        <FieldSet legendText={language.categories} showLegendText>
          <Input
            onChange={onChange}
            value={values.code}
            id="code"
            name="code"
            labelText={language.discountCode}
            required
          />
          <Input
            onChange={onChange}
            value={values.label}
            id="label"
            name="label"
            labelText={language.description}
            required
          />
        </FieldSet>
        <FieldSet legendText="Start & end date" showLegendText>
          <Input
            type="date"
            name="startsAt"

            id="startsAt"
            value={values.startsAt}
            onChange={onChange}
            labelText="startsAt"
          />
        </FieldSet>
      </Form>
    </ErrorBoundary>
  );
};

export default PromoCodeForm;
