// src/domain/dto/AuthDTO.ts

import { User } from '../entities/Auth';

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface LoginResponseDTO {
  access_token: string;
  token_type: string;
  expires_in: string;
  user: User;
}

export interface RegisterRequestDTO {
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: 'customer' | 'admin' | 'staff';
}

export interface AuthResponseDTO {
  success: boolean;
  message: string;
  data: LoginResponseDTO;
}

