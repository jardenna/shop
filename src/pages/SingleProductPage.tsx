import { useParams } from 'react-router';
import Accordion from '../components/accordion/Accordion';
import Favorites from '../components/favorites/Favorites';
import Form from '../components/form/Form';
import Img from '../components/Img';
import ColorListChooseSingle from '../components/productSizeLists/ColorListChooseSingle';
import SizeListChooseSingle from '../components/productSizeLists/SizeListChooseSingle';
import ProductDiscountPrice from '../features/currency/components/ProductDiscountPrice';
import useLanguage from '../features/language/useLanguage';
import { useGetSingleProductQuery } from '../features/shop/shopApiSlice';
import useFormValidation from '../hooks/useFormValidation';
import MetaTags from '../layout/nav/MetaTags';
import './SingleProductPage.styles.scss';

const SingleProductPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { data: product } = useGetSingleProductQuery(id ?? '');

  const initialState = {
    colors: product?.colors[0] ?? '',
    sizes: '',
  };

  const { onChange, values, onSubmit } = useFormValidation({
    initialState,
    callback: () => {
      console.log(values);
    },
  });

  const accordionItems = [
    { title: language.description, content: <p>{product?.description}</p> },
    {
      title: language.materialAndCare,
      content: (
        <>
          <p>
            <strong>{language.material}:</strong> {product?.material}
          </p>
          <strong>{language.care}</strong>
          <ul className="product-care-info">
            <li>{language.doNotBleach}</li>
            <li>{language.noTumbleDry}</li>
            <li>{language.machineWash}</li>
          </ul>
        </>
      ),
    },
    {
      title: language.paymentAndDelivery,
      content: (
        <>
          <p>
            <strong>{language.delivery}:</strong> {language.deliveryText}
          </p>
          <p>
            <strong>{language.payment}:</strong> {language.paymentText}
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <MetaTags metaTitle={product?.productName} />

      {product && (
        <article className="single-product-container">
          <ul className="product-img-list">
            {product.images.map((image) => (
              <li key={image}>
                <Img src={image} alt="" className="product-img" />
              </li>
            ))}
          </ul>
          <section className="single-product">
            <h1>{product.productName}</h1>
            <Favorites id={product.id} />
            <ProductDiscountPrice
              price={product.price}
              discount={product.discount}
            />
            <Form onSubmit={onSubmit} submitBtnLabel={language.create}>
              <SizeListChooseSingle
                sizeList={product.sizes}
                initialChecked={values.sizes}
                onChange={onChange}
                name="sizes"
                optionGroupTitle={language.selectSize}
              />
              <ColorListChooseSingle
                sizeList={product.colors}
                initialChecked={values.colors}
                onChange={onChange}
                name="colors"
                optionGroupTitle={language.selectColor}
                iconName={product.categoryName}
              />
            </Form>

            <p>Brand: {product.brand}</p>
            <p>
              Stock:
              {product.countInStock < 5 ? 'Low in stock' : product.countInStock}
            </p>
            <Accordion accordionItems={accordionItems} />
          </section>
        </article>
      )}
    </div>
  );
};

export default SingleProductPage;
