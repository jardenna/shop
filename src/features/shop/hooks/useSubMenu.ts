import { useGetShopMenuQuery } from '../shopApiSlice';

const useSubMenu = ({ category }: { category?: string }) => {
  const {
    data: subMenu,
    isLoading: subMenuLoading,
    refetch: refetchSubMenu,
  } = useGetShopMenuQuery(category || 'women');

  return { subMenu, subMenuLoading, refetchSubMenu };
};

export default useSubMenu;
