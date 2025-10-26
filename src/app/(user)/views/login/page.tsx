'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import { FaFacebook, FaGoogle, FaApple } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/application/hooks/useAuth';
import { authAPI } from '@/services/api/authAPI';
import { PageTransition } from '../../components/common/PageTransition';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, isAuthenticated, clearError } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [localError, setLocalError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isUserLoggingIn, setIsUserLoggingIn] = useState(false);

  // Redirect nếu đã đăng nhập từ trước (khi vào trang login)
  useEffect(() => {
    // Chỉ redirect khi vào trang login lần đầu và đã login từ trước
    if (isAuthenticated && !isRedirecting && !successMessage) {
      // Lấy thông tin user từ localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          
          // Nếu là admin đã login từ trước → logout và hiển thị lỗi
          if (user.role === 'admin') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            setLocalError('Admin không được phép đăng nhập tại đây. Vui lòng sử dụng trang admin.');
            return;
          }
          
          // Nếu là user/staff đã login từ trước → redirect về home
          router.push('/');
        } catch (error) {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    }
  }, [isAuthenticated, isRedirecting, successMessage, router]);

  // Clear error khi component unmount
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  // Hàm login riêng cho user form - không cho phép admin login
  const handleUserLogin = async (credentials: { username: string; password: string }) => {
    setIsUserLoggingIn(true);
    try {
      // Gọi API login trực tiếp
      const response = await authAPI.login(credentials);
      
      // Kiểm tra role trước khi lưu token
      if (response.user.role === 'admin') {
        // Admin không được phép login ở user form
        throw new Error('Tài khoản hoặc mật khẩu không đúng');
      }
      
      // Chỉ user/staff mới được lưu token
      localStorage.setItem('accessToken', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return true;
    } catch (error: any) {
      return false;
    } finally {
      setIsUserLoggingIn(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage('');
    setLocalError('');
    
    // Đặt cờ "đang chuyển hướng" TRƯỚC KHI await
    // để useEffect ở trên không chạy
    setIsRedirecting(true);
    
    const success = await handleUserLogin({ username, password });
    
    if (success) {
      // Nếu là user/staff → hiển thị modal thành công
      setSuccessMessage('Đăng nhập thành công!');
      
      
      // Delay 2 giây trước khi redirect
      setTimeout(() => {
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
          localStorage.removeItem('redirectAfterLogin');
          router.push(redirectUrl);
        } else {
          router.push('/');
        }
      }, 2000);
      
    } else {
      // Nếu login thất bại, reset lại cờ
      setIsRedirecting(false);
      setLocalError('Tài khoản hoặc mật khẩu không đúng');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10">
        {/* Left Side - Image */}
        <div className="hidden lg:block relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#667EEA]/20 to-[#764BA2]/20 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop"
            alt="Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-8 right-8 z-20 text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-white/90">Đăng nhập để quản lý đặt lịch studio của bạn</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h1>
            <p className="text-gray-600">Chào mừng bạn trở lại!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {(error || localError) && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-800">{error || localError}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 flex items-center space-x-4 animate-in slide-in-from-top-4 duration-500">
                <div className="relative">
                  {/* Outer pulsing ring */}
                  <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
                  {/* Middle bouncing ring */}
                  <div className="absolute inset-2 w-12 h-12 border-3 border-green-300 border-r-green-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                  {/* Inner pulsing checkmark */}
                  <div className="absolute inset-4 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  {/* Success particles */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-green-800 mb-1 animate-pulse">Đăng nhập thành công!</h4>
                  <p className="text-sm text-green-700 mb-2">{successMessage}</p>
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="animate-pulse">Đang chuyển hướng...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Tên đăng nhập
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none transition-colors"
                  required
                  disabled={isUserLoggingIn}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none transition-colors"
                  required
                  disabled={isUserLoggingIn}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isUserLoggingIn}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#667EEA] focus:ring-[#667EEA]"
                />
                <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <Link href="" className="text-sm font-semibold text-[#667EEA] hover:text-[#764BA2] transition-colors">
                Quên mật khẩu?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isUserLoggingIn}
              className="w-full bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isUserLoggingIn ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Đăng nhập</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">Hoặc đăng nhập với</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center py-3 rounded-xl border-2 border-gray-200 hover:border-[#1877F2] hover:bg-[#1877F2]/5 transition-all">
              <FaFacebook className="w-5 h-5 text-[#1877F2]" />
            </button>
            <button className="flex items-center justify-center py-3 rounded-xl border-2 border-gray-200 hover:border-[#DB4437] hover:bg-[#DB4437]/5 transition-all">
              <FaGoogle className="w-5 h-5 text-[#DB4437]" />
            </button>
            <button className="flex items-center justify-center py-3 rounded-xl border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-900/5 transition-all">
              <FaApple className="w-5 h-5 text-gray-900" />
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600">
            Chưa có tài khoản?{' '}
            <Link href="/views/signup" className="font-semibold text-[#667EEA] hover:text-[#764BA2] transition-colors">
              Đăng ký ngay
            </Link>
          </p>

          {/* Back to Home */}
          <Link
            href="/"
            className="mt-4 text-center text-sm text-gray-500 hover:text-gray-700 transition-colors block"
          >
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
      </div>
    </PageTransition>
  );
}

