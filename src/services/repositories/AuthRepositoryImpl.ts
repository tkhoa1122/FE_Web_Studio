// src/services/repositories/AuthRepositoryImpl.ts

import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO } from '../../domain/dto/AuthDTO';
import { authAPI } from '../api/authAPI';

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginRequestDTO): Promise<LoginResponseDTO> {
    try {
      const response = await authAPI.login(credentials);
      
      // Lưu token vào localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  }

  async register(data: RegisterRequestDTO): Promise<LoginResponseDTO> {
    try {
      const response = await authAPI.register(data);
      
      // Lưu token vào localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Đăng ký thất bại');
    }
  }

  async logout(): Promise<void> {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout API failed', error);
    } finally {
      // Xóa token khỏi localStorage dù API có lỗi hay không
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const newToken = await authAPI.refreshToken();
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', newToken);
      }
      
      return newToken;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Làm mới token thất bại');
    }
  }

  async getCurrentUser(): Promise<any> {
    try {
      return await authAPI.getCurrentUser();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Lấy thông tin người dùng thất bại');
    }
  }
}

export const authRepository = new AuthRepositoryImpl();

