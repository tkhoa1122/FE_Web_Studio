'use client';
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Server,
  Database,
  Settings
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/application/hooks/useAuth';
import LoadingSpinner from '@/app/(user)/components/common/LoadingSpinner';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isLoading, error, isAuthenticated, user, clearError } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect logic
  useEffect(() => {
    console.log('🔍 Admin login redirect check:', {
      isLoading,
      isAuthenticated,
      user: user ? { username: user.username, role: user.role } : null
    });

    if (!isLoading) {
      if (isAuthenticated && user) {
        // User đã login
        console.log('✅ User is authenticated:', user.username, 'Role:', user.role);

        if (user.role === 'admin') {
          // Admin đã login → vào dashboard
          const redirectUrl = localStorage.getItem('adminRedirectAfterLogin');
          console.log('🚀 Redirecting admin to:', redirectUrl || '/admin/dashboard');

          if (redirectUrl) {
            localStorage.removeItem('adminRedirectAfterLogin');
            router.push(redirectUrl);
          } else {
            router.push('/admin/dashboard');
          }
        } else {
          // User/Staff login nhưng vào admin login page → về home
          console.warn('⚠️ Non-admin user trying to access admin area');
          setLocalError('Bạn không có quyền truy cập vào trang quản trị');
          setTimeout(() => {
            router.push('/');
          }, 2000);
        }
      } else {
        console.log('ℹ️ User not authenticated, showing login form');
      }
      // Nếu chưa login → hiển thị form login (không làm gì)
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Clear errors
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError('');
    setSuccessMessage('');
    
    console.log('🔐 Admin login attempt for:', username);
    const success = await login({ username, password });
    
    if (success) {
      console.log('✅ Login successful!');
      setSuccessMessage('Đăng nhập thành công!');

      // Log localStorage state
      if (typeof window !== 'undefined') {
        console.log('📦 LocalStorage after login:', {
          hasToken: !!localStorage.getItem('accessToken'),
          hasUser: !!localStorage.getItem('user'),
          userRole: localStorage.getItem('userRole'),
          username: localStorage.getItem('username')
        });
      }
    } else {
      console.error('❌ Login failed');
    }
  };

  // Show loading while checking auth
  if (isLoading && isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner 
          size="lg" 
          fullScreen={false}
          message="Đang xác thực..."
          variant="admin"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col space-y-8 text-white">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-3 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="font-semibold text-blue-100">Admin Portal</span>
            </div>
            
            <h1 className="text-5xl font-bold leading-tight">
              Quản trị hệ thống
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 text-transparent bg-clip-text">
                Studio Booking
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Trung tâm điều khiển toàn diện cho việc quản lý studios, 
              bookings và hệ thống
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 pt-8">
            {[
              { icon: Server, title: 'Quản lý Studios', desc: 'Theo dõi realtime' },
              { icon: Database, title: 'Dữ liệu', desc: 'Phân tích chi tiết' },
              { icon: Settings, title: 'Cấu hình', desc: 'Tùy chỉnh hệ thống' },
              { icon: Sparkles, title: 'Tự động hóa', desc: 'Quy trình thông minh' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all group"
              >
                <feature.icon className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Đăng nhập quản trị
              </h2>
              <p className="text-gray-600">
                Truy cập vào bảng điều khiển hệ thống
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {(error || localError) && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3 animate-in slide-in-from-top">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-800">{error || localError}</p>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start space-x-3 animate-in slide-in-from-top">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-800">{successMessage}</p>
                  </div>
                </div>
              )}

              {/* Username Input */}
              <div>
                <label htmlFor="admin-username" className="block text-sm font-bold text-gray-900 mb-2">
                  Tên đăng nhập Admin
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên đăng nhập"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900 font-medium"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="admin-password" className="block text-sm font-bold text-gray-900 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900 font-medium"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang xác thực...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Đăng nhập vào hệ thống</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Security Note */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Lock className="w-4 h-4" />
                <span>Kết nối được bảo mật và mã hóa</span>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-4 text-center">
              <a 
                href="/"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                ← Quay về trang chủ
              </a>
            </div>
          </div>

          {/* Mobile Branding */}
          <div className="lg:hidden mt-8 text-center text-white">
            <p className="text-sm text-gray-400">
              Studio Booking Admin Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

