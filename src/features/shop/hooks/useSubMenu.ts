import { LinkText } from '../../../layout/nav/enums';
import { useGetShopMenuQuery } from '../shopApiSlice';

export const useSubMenu = (category: LinkText) => {
  const {
    data: subMenu,
    isLoading: isLoadingSubMenu,
    isError: isErrorSubMenu,
    refetch: refetchSubMenu,
  } = useGetShopMenuQuery(category);

  return { subMenu, isLoadingSubMenu, refetchSubMenu, isErrorSubMenu };
};
