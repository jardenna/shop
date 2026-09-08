import { CartItem } from '../../../app/api/apiTypes/cartApiTypes';
import { localStorageKeys } from '../../../hooks/useLocalStorage';

export const cartStorageUtil = {
  load(): CartItem[] {
    try {
      const storedValue = localStorage.getItem(localStorageKeys.cartItems);

      return storedValue ? (JSON.parse(storedValue) as CartItem[]) : [];
    } catch {
      return [];
    }
  },

  save(cartItems: CartItem[]) {
    localStorage.setItem(localStorageKeys.cartItems, JSON.stringify(cartItems));
  },

  clear() {
    localStorage.removeItem(localStorageKeys.cartItems);
  },
};
