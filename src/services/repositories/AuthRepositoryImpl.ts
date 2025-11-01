// src/services/repositories/AuthRepositoryImpl.ts

import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO } from '../../domain/dto/AuthDTO';
import { authAPI } from '../api/authAPI';

function persistAuthToLocalStorage(res: LoginResponseDTO) {
  if (typeof window === 'undefined') return;
  try {
    // Lưu access token
    localStorage.setItem('accessToken', res.access_token);
    localStorage.setItem('tokenType', res.token_type || 'Bearer');

    // Tính toán thời gian hết hạn
    const expiresInSec = parseInt(res.expires_in as any, 10);
    const tokenExpiresAt = Number.isFinite(expiresInSec)
      ? Date.now() + expiresInSec * 1000
      : null;
    if (tokenExpiresAt) {
      localStorage.setItem('tokenExpiresAt', String(tokenExpiresAt));
    }

    // Lưu thông tin user
    localStorage.setItem('user', JSON.stringify(res.user));

    // Lưu thông tin bổ sung để dễ truy cập
    if (res.user?.role) {
      localStorage.setItem('userRole', res.user.role);
    }
    if (res.user?.userid != null) {
      localStorage.setItem('userId', String(res.user.userid));
    }
    if (res.user?.username) {
      localStorage.setItem('username', res.user.username);
    }
    if (res.user?.email) {
      localStorage.setItem('userEmail', res.user.email);
    }
    if (res.user?.fullName) {
      localStorage.setItem('userFullName', res.user.fullName);
    }

    console.log('✅ Auth info saved to localStorage:', {
      token: res.access_token.substring(0, 20) + '...',
      user: res.user,
      expiresAt: tokenExpiresAt ? new Date(tokenExpiresAt).toLocaleString() : 'N/A'
    });
  } catch (e) {
    console.error('❌ Failed to persist auth to localStorage:', e);
  }
}

function clearAuthFromLocalStorage() {
  if (typeof window === 'undefined') return;
  try {
    const keysToRemove = [
      'accessToken',
      'tokenType',
      'tokenExpiresAt',
      'user',
      'userRole',
      'userId',
      'username',
      'userEmail',
      'userFullName',
      'adminRedirectAfterLogin'
    ];
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log('✅ Auth info cleared from localStorage');
  } catch (e) {
    console.error('❌ Failed to clear auth from localStorage:', e);
  }
}

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginRequestDTO): Promise<LoginResponseDTO> {
    try {
      console.log('🔐 Attempting login for:', credentials.username);
      const response = await authAPI.login(credentials);

      // Lưu token và thông tin người dùng vào localStorage
      persistAuthToLocalStorage(response);

      return response;
    } catch (error: any) {
      console.error('❌ Login failed:', error.message);
      throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  }

  async register(data: RegisterRequestDTO): Promise<LoginResponseDTO> {
    try {
      console.log('📝 Attempting registration for:', data.username);
      const response = await authAPI.register(data);

      // Lưu token và thông tin người dùng vào localStorage
      persistAuthToLocalStorage(response);

      return response;
    } catch (error: any) {
      console.error('❌ Registration failed:', error.message);
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
      clearAuthFromLocalStorage();
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

