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
  sale: Product[];
}

//Products slice types

export interface ProductsState {
  products: Product[];
  categories: string[];
  sale: Product[];
  currentPage: number;
  searchValue: string;
}

// Cart types

export interface CartItem {
  productId: Product;
  quantity: number;
}

export interface CartResponse {
  cart: { items: CartItem[] };
}

export interface QuantityCredentials {
  productId: string;
  quantity: number;
}

export const msgOptions = {
  icon: "🛒",
  style: {
    border: "1px solid #713200",
    padding: "16px",
    color: "#713200",
  },
  iconTheme: {
    primary: "#713200",
    secondary: "#FFFAEE",
  },
};
