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
  user: { id: string; email: string; username: string };
}

// Auth slice interfaces

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthState {
  user: User;
  token: string;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}
