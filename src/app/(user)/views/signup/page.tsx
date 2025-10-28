'use client';
import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, Send, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/application/hooks/useAuth';

export default function SignUpPage() {
  const router = useRouter();
  const { register, isLoading, error, isAuthenticated, clearError } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [countdown, setCountdown] = useState(0);

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      // Lấy thông tin user từ localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          
          // Nếu là admin đã login → redirect về admin dashboard
          if (user.role === 'admin') {
            router.push('/dashboard');
            return;
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
      
      // Nếu là user/staff → redirect về home
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Countdown effect
  useEffect(() => {
    if (showSuccess && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showSuccess && countdown === 0) {
      router.push('/');
    }
  }, [showSuccess, countdown, router]);
  // Clear error khi component unmount
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    // Username validation
    if (!formData.username.trim()) {
      errors.username = 'Tên đăng nhập là bắt buộc';
    } else if (formData.username.length < 3) {
      errors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
    } else if (formData.username.length > 20) {
      errors.username = 'Tên đăng nhập không được quá 20 ký tự';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới';
    }
    
    // Full name validation
    if (!formData.fullName.trim()) {
      errors.fullName = 'Họ tên là bắt buộc';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
    } else if (formData.fullName.trim().length > 50) {
      errors.fullName = 'Họ tên không được quá 50 ký tự';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
    } else if (formData.email.length > 100) {
      errors.email = 'Email không được quá 100 ký tự';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    } else if (formData.password.length > 50) {
      errors.password = 'Mật khẩu không được quá 50 ký tự';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu không khớp';
    }
    
    // Terms validation
    if (!formData.agreeTerms) {
      errors.agreeTerms = 'Bạn phải đồng ý với điều khoản và điều kiện';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationErrors({});
    
    if (!validateForm()) {
      return;
    }
    
    const success = await register({
      username: formData.username,
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: 'customer' // Mặc định là customer
    });
    
    if (success) {
      setShowSuccess(true);
      setCountdown(4); // 4 giây countdown
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] flex items-center justify-center p-4 animate-in fade-in duration-700">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in duration-1000">
          {/* Left Side - Image */}
          <div className="hidden lg:block relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 z-10"></div>
          <img
            src="/photo-1601856254555-a9c0ebef8af3.png"
            alt="Success"
            className="w-full h-full object-cover"
          />
          </div>

          {/* Right Side - Success Message */}
          <div className="p-8 md:p-12 flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-1000 delay-300">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 animate-in slide-in-from-bottom-4 duration-1000 delay-500">
              Đăng ký thành công!
            </h2>
            <p className="text-gray-600 mb-6 animate-in slide-in-from-bottom-4 duration-1000 delay-700">
              Chào mừng bạn đến với Studio Booking! Tài khoản của bạn đã được tạo thành công.
            </p>
            
            {/* Countdown */}
            <div className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-6 py-3 rounded-xl font-semibold mb-6 animate-in slide-in-from-bottom-4 duration-1000 delay-900">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Chuyển về trang chủ trong {countdown} giây...</span>
              </div>
            </div>

            <Link
              href="/"
              className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all animate-in slide-in-from-bottom-4 duration-1000 delay-1000"
            >
              Về trang chủ ngay
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] flex items-center justify-center p-4 animate-in fade-in duration-700">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
        {/* Left Side - Image */}
        <div className="hidden lg:block relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#667EEA]/20 to-[#764BA2]/20 z-10"></div>
          <img
            src="/photo-1601856254555-a9c0ebef8af3.png"
            alt="Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-8 right-8 z-20 text-white">
            <h2 className="text-3xl font-bold mb-2">Bắt đầu ngay!</h2>
            <p className="text-white/90">Tạo tài khoản để trải nghiệm dịch vụ tuyệt vời của chúng tôi</p>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center animate-in slide-in-from-right-4 duration-1000 delay-400">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký</h1>
            <p className="text-gray-600">Tạo tài khoản mới</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 animate-in slide-in-from-bottom-4 duration-1000 delay-600">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3 animate-in slide-in-from-top-4 duration-500">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-800">{error}</p>
                </div>
              </div>
            )}

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Tên đăng nhập
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border-2 focus:outline-none transition-colors text-sm ${
                    validationErrors.username ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#667EEA]'
                  }`}
                  required
                  disabled={isLoading}
                />
              </div>
              {validationErrors.username && (
                <p className="mt-1 text-sm text-red-600 animate-in slide-in-from-top-2 duration-300">{validationErrors.username}</p>
              )}
            </div>

            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                Họ và tên
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border-2 focus:outline-none transition-colors text-sm ${
                    validationErrors.fullName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#667EEA]'
                  }`}
                  required
                  disabled={isLoading}
                />
              </div>
              {validationErrors.fullName && (
                <p className="mt-1 text-sm text-red-600 animate-in slide-in-from-top-2 duration-300">{validationErrors.fullName}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border-2 focus:outline-none transition-colors text-sm ${
                    validationErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#667EEA]'
                  }`}
                  required
                  disabled={isLoading}
                />
              </div>
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600 animate-in slide-in-from-top-2 duration-300">{validationErrors.email}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border-2 focus:outline-none transition-colors text-sm ${
                      validationErrors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#667EEA]'
                    }`}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-600 animate-in slide-in-from-top-2 duration-300">{validationErrors.password}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nhập lại mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border-2 focus:outline-none transition-colors text-sm ${
                      validationErrors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#667EEA]'
                    }`}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 animate-in slide-in-from-top-2 duration-300">{validationErrors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                  className={`w-4 h-4 mt-1 rounded border-gray-300 text-[#667EEA] focus:ring-[#667EEA] ${
                    validationErrors.agreeTerms ? 'border-red-300' : ''
                  }`}
                  required
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-600">
                  Tôi đồng ý với{' '}
                  <Link href="#" className="text-[#667EEA] font-semibold hover:text-[#764BA2] transition-colors">
                    Điều khoản & Điều kiện
                  </Link>{' '}
                  của tổ chức
                </span>
              </label>
              {validationErrors.agreeTerms && (
                <p className="mt-1 text-sm text-red-600 animate-in slide-in-from-top-2 duration-300">{validationErrors.agreeTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-in slide-in-from-bottom-4 duration-1000 delay-800"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang đăng ký...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Đăng ký</span>
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-gray-600 animate-in slide-in-from-bottom-4 duration-1000 delay-1000">
            Đã có tài khoản?{' '}
            <Link href="/views/login" className="font-semibold text-[#667EEA] hover:text-[#764BA2] transition-colors">
              Đăng nhập
            </Link>
          </p>

          {/* Back to Home */}
          <Link
            href="/"
            className="mt-4 text-center text-sm text-gray-500 hover:text-gray-700 transition-colors block animate-in slide-in-from-bottom-4 duration-1000 delay-1200"
          >
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

