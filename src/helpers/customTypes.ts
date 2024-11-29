// Auth operations interfaces

export interface RegCredentials {
  username: string;
  email: string;
  password: string;
}

export interface RegResponse {
  id: string;
  email: string;
  username: string;
}

export interface LogCredentials {
  email: string;
  password: string;
}

export interface LogResponse {
  token: string;
  user: { id: string; email: string; username: string; cart: CartItem[] };
}

// Auth slice interfaces

export interface User {
  id: string;
  email: string;
  username: string;
  cart: CartItem[];
}

export interface AuthState {
  user: User;
  token: string;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

//Products operations types

export interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export interface ProductsData {
  products: Product[];
  categories: string[];
}

//Products slice types

export interface ProductsState {
  products: Product[];
  categories: string[];
  currentPage: number;
}

// Cart types

export interface CartItem {
  productId: Product;
  quantity: number;
}

export interface CartResponse {
  cart: CartItem[];
}

export interface QuantityCredentials {
  productId: string;
  quantity: number;
}
