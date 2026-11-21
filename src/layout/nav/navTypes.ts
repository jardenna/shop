import type { AdminPath, LinkText, ShopPath } from './navConstants';

export type AdminPathValue = (typeof AdminPath)[keyof typeof AdminPath];
export type ShopPathValue = (typeof ShopPath)[keyof typeof ShopPath];
export type LinkTextValue = (typeof LinkText)[keyof typeof LinkText];
