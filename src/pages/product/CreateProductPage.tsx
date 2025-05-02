import PageHeader from '../../components/PageHeader';
import useLanguage from '../../features/language/useLanguage';
import ProductForm from '../../features/products/ProductForm';

const CreateProductPage = () => {
  const { language } = useLanguage();
  return (
    <section className="page">
      <PageHeader heading={language.createNewCategory} />

      <div className="page-card">
        <ProductForm selectedProduct={null} id={null} />
      </div>
    </section>
  );
};

export default CreateProductPage;
