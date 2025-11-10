// src/services/config/axios.ts
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
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
    // Simple retry with exponential backoff: 3 attempts
    const config: any = error.config || {};
    if (!config.__retryCount) config.__retryCount = 0;
    const shouldRetry = !error.response && error.code === 'ECONNABORTED' || error.message?.includes('timeout');
    if (shouldRetry && config.__retryCount < 3) {
      config.__retryCount += 1;
      const backoff = Math.min(2000 * Math.pow(2, config.__retryCount - 1), 8000);
      return new Promise((resolve) => setTimeout(resolve, backoff)).then(() => axiosInstance(config));
    }
    if (error.response?.status === 401 && typeof window !== 'undefined') {
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


