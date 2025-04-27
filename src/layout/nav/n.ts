import { categoryUrl, productUrl, subCategoryUrl } from '../../app/endpoints';

const path = {
  about: 'about',
  admin: 'admin',
  categories: categoryUrl,
  categoryCreate: `${categoryUrl}/create`,
  categoryUpdate: `${categoryUrl}/update`,
  orders: 'orders',
  productCreate: `${productUrl}/create`,
  productUpdate: `${productUrl}/update`,
  productView: `${productUrl}/view`,
  products: productUrl,
  profile: 'profile',
  subcategories: subCategoryUrl,
  subcategoryCreate: `${subCategoryUrl}/create`,
  subcategoryUpdate: `${subCategoryUrl}/update`,
  subcategoryView: `${subCategoryUrl}/view`,
  collection: 'collection',
  contact: 'contact',
  home: 'home',
  login: 'login',
  myaccount: 'myaccount',
  myOrders: 'myOrders',
  root: '/',
  shoppingcart: 'shopping-cart',
  signup: 'signup',
  update: 'update',
  users: 'users',
};

export default path;
