// src/application/hooks/useAuth.ts

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { loginUser, registerUser, logoutUser, checkAuthStatus, clearError } from '../redux/slices/authSlice';
import { LoginRequestDTO, RegisterRequestDTO } from '../../domain/dto/AuthDTO';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Kiểm tra auth status khi component mount
    dispatch(checkAuthStatus());
  }, [dispatch]);

  const login = async (credentials: LoginRequestDTO) => {
    const result = await dispatch(loginUser(credentials));
    if (loginUser.fulfilled.match(result)) {
      return true;
    }
    return false;
  };

  const register = async (data: RegisterRequestDTO) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      return true;
    }
    return false;
  };

  const logout = async () => {
    await dispatch(logoutUser());
    router.push('/');
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError: clearAuthError,
  };
};

