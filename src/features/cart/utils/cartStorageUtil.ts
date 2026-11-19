import { CartItem } from '../../../app/api/apiTypes/cartApiTypes';
import { localStorageKeys } from '../../../hooks/useLocalStorage';

export const cartStorageUtil = {
  load(): CartItem[] {
    try {
      const storedValue = localStorage.getItem(localStorageKeys.cartItems);

      if (!storedValue) return [];

      const parsedValue: unknown = JSON.parse(storedValue);
      return Array.isArray(parsedValue) ? (parsedValue as CartItem[]) : [];
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
