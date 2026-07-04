import { CartItem } from '../../app/api/apiTypes/sharedApiTypes';
import { localStorageKeys } from '../../hooks/useLocalStorage';

export const cartStorageUtil = {
  load(): CartItem[] {
    try {
      const storedValue = localStorage.getItem(localStorageKeys.cartList);

      return storedValue ? (JSON.parse(storedValue) as CartItem[]) : [];
    } catch {
      return [];
    }
  },

  save(cartList: CartItem[]) {
    localStorage.setItem(localStorageKeys.cartList, JSON.stringify(cartList));
  },

  clear() {
    localStorage.removeItem(localStorageKeys.cartList);
  },
};
