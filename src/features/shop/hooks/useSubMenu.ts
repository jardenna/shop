import { LinkText } from '../../../layout/nav/enums';
import { useGetShopMenuQuery } from '../shopApiSlice';

export const useSubMenu = (category: LinkText) => {
  const {
    data: subMenu,
    isLoading: subMenuLoading,
    refetch: refetchSubMenu,
  } = useGetShopMenuQuery(category);

  return { subMenu, subMenuLoading, refetchSubMenu };
};
