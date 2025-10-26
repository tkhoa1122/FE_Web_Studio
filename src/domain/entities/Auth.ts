// src/domain/entities/Auth.ts

export interface User {
  userid: number;
  username: string;
  email: string;
  fullName: string;
  role: 'admin' | 'user' | 'staff';
}

export interface AuthToken {
  access_token: string;
  token_type: string;
  expires_in: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

