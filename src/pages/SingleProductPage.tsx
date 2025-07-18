import { useParams } from 'react-router';
import Accordion from '../components/accordion/Accordion';
import Favorites from '../components/favorites/Favorites';
import Form from '../components/form/Form';
import Img from '../components/Img';
import RadioColorList from '../components/productColorList/RadioColorList';
import ProductSizeList from '../components/productSizeList/ProductSizeList';
import SizeSelector from '../components/sizeSelector/SizeSelector';
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

  const colorList = product?.colors.map((color) => ({
    value: color,
    label: color,
  }));

  const initialState = {
    colors: colorList ? colorList[0].value : '',
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
              <SizeSelector />
              {colorList && (
                <RadioColorList
                  radioButtonList={colorList}
                  initialChecked={values.colors || colorList[0].value}
                  onChange={onChange}
                  iconName={product.categoryName}
                />
              )}
            </Form>
            <ProductSizeList sizes={product.sizes} />
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
