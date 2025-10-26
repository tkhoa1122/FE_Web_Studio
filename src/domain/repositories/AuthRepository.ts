// src/domain/repositories/AuthRepository.ts

import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO } from '../dto/AuthDTO';

export interface AuthRepository {
  login(credentials: LoginRequestDTO): Promise<LoginResponseDTO>;
  register(data: RegisterRequestDTO): Promise<LoginResponseDTO>;
  logout(): Promise<void>;
  refreshToken(): Promise<string>;
  getCurrentUser(): Promise<any>;
}

