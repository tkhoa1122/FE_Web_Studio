'use client';
import React, { useState } from 'react';
import { Camera, Menu, X, LogIn, UserPlus } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Studio Booking
            </span>
          </div>

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

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="flex items-center space-x-2 text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all backdrop-blur-sm">
              <LogIn className="w-4 h-4" />
              <span className="font-medium">Đăng nhập</span>
            </button>
            <button className="flex items-center space-x-2 bg-white text-[#667EEA] px-5 py-2 rounded-lg hover:bg-white/90 hover:shadow-lg transition-all font-semibold">
              <UserPlus className="w-4 h-4" />
              <span>Đăng ký</span>
            </button>
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
              <button className="w-full flex items-center justify-center space-x-2 text-white hover:bg-white/20 px-4 py-3 rounded-lg transition-all backdrop-blur-sm">
                <LogIn className="w-4 h-4" />
                <span className="font-medium">Đăng nhập</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-white text-[#667EEA] px-4 py-3 rounded-lg font-semibold">
                <UserPlus className="w-4 h-4" />
                <span>Đăng ký</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
