import { useGetShopMenuQuery } from '../shopApiSlice';

const useSubMenu = (category: string) => {
  const {
    data: subMenu,
    isLoading: subMenuLoading,
    refetch: refetchSubMenu,
  } = useGetShopMenuQuery(category);

  return { subMenu, subMenuLoading, refetchSubMenu };
};

export default useSubMenu;
