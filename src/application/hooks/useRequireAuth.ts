// src/application/hooks/useRequireAuth.ts

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

/**
 * Hook để bảo vệ các trang yêu cầu đăng nhập
 * Sử dụng trong các trang như booking, profile, v.v.
 */
export const useRequireAuth = (redirectUrl: string = '/views/login') => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Lưu URL hiện tại để redirect về sau khi login
      const currentPath = window.location.pathname;
      localStorage.setItem('redirectAfterLogin', currentPath);
      
      router.push(redirectUrl);
    }
  }, [isAuthenticated, isLoading, router, redirectUrl]);

  return { isAuthenticated, isLoading };
};

