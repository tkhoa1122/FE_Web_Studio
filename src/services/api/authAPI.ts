// src/services/api/authAPI.ts

import { axiosInstance } from '../../config/axios';
import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, AuthResponseDTO } from '../../domain/dto/AuthDTO';

export const authAPI = {
  async login(credentials: LoginRequestDTO): Promise<LoginResponseDTO> {
    const response = await axiosInstance.post<AuthResponseDTO>('/auth/login', credentials);
    return response.data.data;
  },

  async register(data: RegisterRequestDTO): Promise<LoginResponseDTO> {
    const response = await axiosInstance.post<AuthResponseDTO>('/auth/register', data);
    return response.data.data;
  },

  async logout(): Promise<void> {
    // Chỉ xóa token từ localStorage, không cần gọi API logout
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  async refreshToken(): Promise<string> {
    const response = await axiosInstance.post<{ data: { access_token: string } }>('/auth/refresh');
    return response.data.data.access_token;
  },

  async getCurrentUser(): Promise<any> {
    const response = await axiosInstance.get('/auth/profile');
    return response.data.data;
  },
};

