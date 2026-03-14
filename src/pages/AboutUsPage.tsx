import { useLanguage } from '../features/language/useLanguage';
import { useGetProductsQuery } from '../features/shop/shopApiSlice';
import { useSearchParamsState } from '../hooks/useSearchParamsState';
import { colorList, sortColorsByTranslation } from '../utils/colorUtils';
import MainPageContainer from './pageContainer/MainPageContainer';
import ParamsPage from './ParamsPage';

export interface SearchParamState {
  [paramKey: string]: string | string[];
}
export interface InitialFilters extends SearchParamState {
  brand: string[];
  colors: string[];
  maxPrice: string;
  minPrice: string;
  sizes: string[];
}

const AboutUsPage = () => {
  const initialFilters: InitialFilters = {
    sizes: [] as string[],
    colors: [] as string[],
    brand: [] as string[],
    minPrice: '',
    maxPrice: '',
  };

  const { values } = useSearchParamsState(initialFilters);
  const { data: products } = useGetProductsQuery({
    productsPerPage: 10,
    page: '1',
    colors: values.colors,
    brand: values.brand,
    sizes: values.sizes,
    mainCategory: 'women',
    subCategoryId: '',
  });

  const { language } = useLanguage();
  const sortedTranslatedColors = sortColorsByTranslation(colorList, language);

  return (
    <MainPageContainer heading="about">
      <section>
        {products && (
          <ParamsPage
            initialFilters={initialFilters}
            sizes={products.availableSizes}
            brands={products.availableBrands}
            colors={sortedTranslatedColors}
            language={language}
            productCount={products.productCount}
          />
        )}
      </section>
    </MainPageContainer>
  );
};

export default AboutUsPage;
