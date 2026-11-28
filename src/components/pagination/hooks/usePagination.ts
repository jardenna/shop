import type { SingleValue } from 'react-select';
import type { Language, OptionWithId } from '../../../shared/types';
import { paginationText } from '../utils/paginationText';
import { useScrollOnPagination } from './useScrollOnPagination';

interface UsePaginationProps {
  isLoading: boolean;
  itemCount: number;
  itemsPerPage: number;
  language: Language;
  page: number;
  totalBtns: number;
  setPage: (page: number) => void;
  updatePagination: (page: number, count: number) => void;
}

export const usePagination = ({
  isLoading,
  page,
  itemsPerPage,
  itemCount,
  totalBtns,
  language,
  setPage,
  updatePagination,
}: UsePaginationProps) => {
  const { scrollToRef, setShouldScroll } =
    useScrollOnPagination<HTMLTableElement>({
      isLoading,
    });

  const handlePagination = (pageId: number) => {
    if (pageId === page) {
      return;
    }

    setPage(pageId);
    setShouldScroll(true);
  };

  const handleSelectCount = (selected: SingleValue<OptionWithId>) => {
    if (!selected) {
      return;
    }

    updatePagination(1, Number(selected.value));
    setShouldScroll(true);
  };
  const { paginationMobileText } = paginationText({
    page,
    itemsPerPage,
    itemCount,
    totalBtns,
    language,
  });

  return {
    scrollToRef,
    handlePagination,
    handleSelectCount,
    paginationMobileText,
  };
};
