'use client';
import React from 'react';
import { Camera, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Studio</span>
            </div>
            <p className="text-sm text-white/80 mb-6 leading-relaxed">
              Hệ thống quản lý cho thuê Studio chuyên nghiệp, 
              phục vụ các công ty quảng cáo, agency truyền thông 
              và đơn vị sản xuất nội dung.
            </p>
            <div className="flex space-x-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <button key={index} className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2.5 rounded-lg transition-all hover:scale-110">
                  <Icon className="w-4 h-4 text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              Thông tin liên hệ
            </h3>
            <div className="space-y-3">
              {[
                { Icon: MapPin, text: '123 Nguyễn Huệ, Quận 1, TP.HCM' },
                { Icon: Phone, text: '0909 123 456' },
                { Icon: Mail, text: 'info@studio.com' }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg group-hover:bg-white/30 transition-all">
                    <item.Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-white/80 pt-1">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Latest News */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              Tin tức mới nhất
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Khai trương Studio VIP mới', date: '15/01/2024' },
                { title: 'Ưu đãi đặc biệt tháng 1', date: '01/01/2024' },
                { title: 'Hướng dẫn đặt lịch online', date: '20/12/2023' }
              ].map((news, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-white/60 mt-1 group-hover:translate-x-1 transition-transform" />
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-white/80 transition-colors">
                        {news.title}
                      </p>
                      <p className="text-xs text-white/60 mt-1">
                        {news.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Images */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              Hình ảnh nổi bật
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                'photo-1578662996442-48f60103fc96',
                'photo-1516321318423-f06f85e504b3',
                'photo-1606983340126-99ab4feaa64a',
                'photo-1492144534655-ae79c964c9d7',
                'photo-1598300042247-d088f8ab3a91',
                'photo-1574717024653-61fd2cf4d44d'
              ].map((imageId, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-xl border-2 border-white/20 hover:border-white/40 group"
                >
                  <img
                    src={`https://images.unsplash.com/${imageId}?w=200&h=200&fit=crop`}
                    alt={`Studio ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 my-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-white/80 font-medium">
            © {currentYear} Studio Management System. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-sm text-white/60 mt-2">
            Được phát triển bởi <span className="text-white font-semibold">SWD392 Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
