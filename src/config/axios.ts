// src/services/config/axios.ts
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    // Log detailed error information for debugging
    console.error('🔴 API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
      message: error.message
    });
    
    // Handle 401 Unauthorized - clear auth and redirect
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      console.warn('🔐 Token expired or unauthorized, clearing auth data');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      const pathname = window.location.pathname;

      // 401 ở admin routes → redirect admin login
      if (pathname.startsWith('/admin') && !pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
      // 401 ở user protected routes → redirect user login
      else if (pathname.includes('/booking') || pathname.includes('/profile')) {
        window.location.href = '/views/login';
      }
    }
    
    return Promise.reject(error);
  }
);


