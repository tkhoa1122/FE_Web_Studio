// src/application/hooks/useRequireAdmin.ts

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

/**
 * Hook để bảo vệ các trang admin
 * - Chưa login: redirect đến /admin/login
 * - Đã login nhưng không phải admin: redirect về trang trước hoặc home
 * - Admin: cho phép truy cập
 */
export const useRequireAdmin = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Chưa đăng nhập → redirect đến admin login
      if (!isAuthenticated) {
        const currentPath = window.location.pathname;
        localStorage.setItem('adminRedirectAfterLogin', currentPath);
        router.push('/admin/login');
        return;
      }

      // Đã đăng nhập nhưng không phải admin
      if (user && user.role !== 'admin') {
        // Lấy URL cũ nếu có, không thì về home
        const previousUrl = localStorage.getItem('previousUrl') || '/';
        localStorage.removeItem('previousUrl');
        router.push(previousUrl);
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  return { 
    isAuthenticated, 
    isLoading, 
    isAdmin: user?.role === 'admin' 
  };
};

