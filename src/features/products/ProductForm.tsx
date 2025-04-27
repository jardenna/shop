import { Product, ProductRequest } from '../../app/api/apiTypes';
import Form from '../../components/Form';
import useFormValidation from '../../hooks/useFormValidation';
import useLanguage from '../language/useLanguage';

type ProductFormProps = {
  id: string | null;
  selectedCategory: Product | null;
};

const ProductForm = ({ id }: ProductFormProps) => {
  const { language } = useLanguage();

  const initialState: ProductRequest = {
    brand: '',
    colors: [],
    quantity: 0,
    description: '',
    image: '',
    material: '',
    price: 0,
    discount: 0,
    productName: '',
    productStatus: 'Inactive',
    sizes: [],
  };

  const { onChange, values, onSubmit, errors, onCustomChange } =
    useFormValidation({
      initialState,
      callback: handleSubmitProduct,
    });

  function handleSubmitProduct() {
    console.log(12);
  }

  return (
    <Form
      onSubmit={onSubmit}
      submitBtnLabel={id ? language.save : language.create}
    >
      form
    </Form>
  );
};

export default ProductForm;
