'use client';
import React, { useState } from 'react';
import { Camera, Menu, X, LogIn, UserPlus, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/application/hooks/useAuth';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  const navigationItems = [
    { label: 'Trang Chủ', href: '/' },
    { label: 'Studios', href: '/views/studios', hasDropdown: true },
    { label: 'Thiết bị cho thuê', href: '/views/equipment', hasDropdown: true },
    { label: 'Đặt Lịch', href: '/views/booking' },
    { label: 'Liên hệ', href: '/views/contact' },
    { label: 'Blog', href: '/views/blog' }
  ];

  return (
    <header className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Studio Booking
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 flex-1 ml-8">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white text-sm font-medium hover:bg-white/20 px-4 py-2 rounded-lg transition-all backdrop-blur-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all backdrop-blur-sm"
                >
                  <div className="bg-white/30 p-1 rounded-full">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{user.fullName || user.username}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold">
                        {user.role}
                      </span>
                    </div>
                    <Link
                      href="/views/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Tài khoản của tôi</span>
                    </Link>
                    <Link
                      href="/views/booking"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Camera className="w-4 h-4" />
                      <span>Đặt lịch của tôi</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/views/login" className="flex items-center space-x-2 text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all backdrop-blur-sm">
                  <LogIn className="w-4 h-4" />
                  <span className="font-medium">Đăng nhập</span>
                </Link>
                <Link href="/views/signup" className="flex items-center space-x-2 bg-white text-[#667EEA] px-5 py-2 rounded-lg hover:bg-white/90 hover:shadow-lg transition-all font-semibold">
                  <UserPlus className="w-4 h-4" />
                  <span>Đăng ký</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white bg-white/20 p-2 rounded-lg backdrop-blur-sm"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-in slide-in-from-top">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-white text-base font-medium hover:bg-white/20 px-4 py-3 rounded-lg transition-all backdrop-blur-sm"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-3 bg-white/20 rounded-lg backdrop-blur-sm mb-2">
                    <p className="text-sm font-semibold text-white">{user.fullName}</p>
                    <p className="text-xs text-white/80">{user.email}</p>
                  </div>
                  <Link 
                    href="/views/profile" 
                    className="w-full flex items-center justify-center space-x-2 text-white hover:bg-white/20 px-4 py-3 rounded-lg transition-all backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Tài khoản</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Đăng xuất</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/views/login" className="w-full flex items-center justify-center space-x-2 text-white hover:bg-white/20 px-4 py-3 rounded-lg transition-all backdrop-blur-sm">
                    <LogIn className="w-4 h-4" />
                    <span className="font-medium">Đăng nhập</span>
                  </Link>
                  <Link href="/views/signup" className="w-full flex items-center justify-center space-x-2 bg-white text-[#667EEA] px-4 py-3 rounded-lg font-semibold">
                    <UserPlus className="w-4 h-4" />
                    <span>Đăng ký</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
