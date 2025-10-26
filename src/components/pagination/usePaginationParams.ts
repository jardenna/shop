import { useSearchParams } from 'react-router';
import { pageParamKey, productsPerPageParamKey } from '../../utils/utils';

const usePaginationParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get(pageParamKey)) || 1;
  const productsPerPage =
    Number(searchParams.get(productsPerPageParamKey)) || 8;

  const setPage = (pageNum: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(pageParamKey, pageNum.toString());
    setSearchParams(newParams);
  };

  const resetPage = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(pageParamKey, '1');
    setSearchParams(newParams);
  };

  const updatePagination = (pageNum: number, count: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(pageParamKey, pageNum.toString());
    newParams.set(productsPerPageParamKey, count.toString());
    setSearchParams(newParams);
  };

  return {
    page,
    productsPerPage,
    setPage,
    resetPage,
    updatePagination,
    searchParams,
  };
};

export default usePaginationParams;
