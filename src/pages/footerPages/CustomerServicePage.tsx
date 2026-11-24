/* eslint-disable no-underscore-dangle */
import MailTo from '../../components/MailTo';
import SelectField from '../../components/selectbox/SelectField';
import { useLanguage } from '../../features/language/useLanguage';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';
import { useGetSubCategoriesWithParentQuery } from '../../features/subCategories/subCategoryApiSlice';
import {
  contactInformation,
  shopInformationList,
  shopName,
} from '../../utils/contactInformation';
import MainPageContainer from '../pageContainer/MainPageContainer';

const CustomerServicePage = () => {
  const { language } = useLanguage();
  const { data: subCategories } = useGetSubCategoriesWithParentQuery();
  const id = '68512200e5d1e20900c9ad83';
  const { data: product } = useGetProductByIdQuery(id);

  return (
    <MainPageContainer
      heading={language.contactCustomerService}
      className="general-page"
    >
      <div className="generel-page-container">
        {subCategories && product && (
          <>
            <SelectField
              parentCategories={subCategories}
              selectedSubCategoryId={product.subCategory._id}
              selectedProduct={product}
              allowedSizes={product.subCategory.allowedSizes}
              images={product.images}
              id={id}
            />
            <SelectField
              parentCategories={subCategories}
              selectedSubCategoryId={null}
              selectedProduct={null}
              images={[]}
              allowedSizes={[]}
              id={null}
            />
          </>
        )}
        <section>
          <h2>We're here to help</h2>
          <p>
            Have a question about your order, delivery, returns or our products
            Our customer service team is happy to help.
          </p>
        </section>
        <section>
          <h2>Address</h2>
          <h3>{shopName}</h3>
          {shopInformationList.map((shopInfo) => (
            <div key={shopInfo}>{shopInfo}</div>
          ))}
        </section>
        <section>
          <h2>Contact us</h2>
          <p>
            Email us at <MailTo email={contactInformation.email} />
          </p>
          <p>We aim to respond to all enquiries within 1–2 business days.</p>
        </section>
        <section>
          <h2>Before you contact us</h2>
          <p>
            If your question is about an existing order, please include your
            order number so we can help you as quickly as possible.
          </p>
        </section>
        <section>
          <h2>Customer service hours</h2>
          <p>Monday–Friday: 9:00–17:00</p>
          <p>We are closed on weekends and public holidays.</p>
        </section>
      </div>
    </MainPageContainer>
  );
};

export default CustomerServicePage;
