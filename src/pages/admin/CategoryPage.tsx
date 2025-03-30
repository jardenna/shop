import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';

const CategoryPage = () => {
  const { language } = useLanguage();
  const { onChange, values, onSubmit, errors } = useFormValidation({
    initialState: {
      categoryName: '',
    },
  });

  return (
    <section>
      <h1>{language.categories}</h1>
      <Form onSubmit={onSubmit} submitBtnLabel={language.save}>
        <Input
          onChange={onChange}
          value={values.categoryName}
          id="categoryName"
          name="categoryName"
          labelText={language.addCategory}
          placeholder={language.categoryName}
          errorText={errors.categoryName}
        />
      </Form>
    </section>
  );
};

export default CategoryPage;
