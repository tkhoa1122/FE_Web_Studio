'use client';
import React from 'react';
import { Camera, Video, Megaphone, Calendar } from 'lucide-react';

const HomeHero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white min-h-[85vh] flex items-center overflow-hidden pt-24 md:pt-32 pb-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-5xl font-bold leading-tight mb-6 animate-in slide-in-from-left">
              Studio chụp ảnh <span className="bg-white text-transparent bg-clip-text whitespace-nowrap">Hiện đại & Chuyên nghiệp</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0 animate-in slide-in-from-left delay-200">
              Không gian studio hiện đại với thiết bị chuyên nghiệp, phục vụ các công ty quảng cáo, agency truyền thông và đơn vị sản xuất nội dung hàng đầu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-in slide-in-from-left delay-300">
              <button className="bg-white text-[#667EEA] px-8 py-4 text-lg font-bold rounded-xl hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all">
                Đặt lịch ngay
              </button>
              <button className="border-2 border-white text-white px-8 py-4 text-lg font-bold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all">
                Xem bảng giá
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-10 max-w-xl mx-auto md:mx-0 animate-in slide-in-from-left delay-500">
              {[
                { icon: Megaphone, number: '500+', label: 'Dự án hoàn thành' },
                { icon: Calendar, number: '24/7', label: 'Hỗ trợ khách hàng' },
                { icon: Video, number: '100+', label: 'Khách hàng tin tưởng' }
              ].map((stat, index) => (
                <div key={index} className="text-center bg-white/20 backdrop-blur-md p-6 rounded-2xl hover:bg-white/30 transition-all border border-white/30">
                  <stat.icon className="w-8 h-8 text-white mx-auto mb-3" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm font-semibold text-white">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full animate-in slide-in-from-right delay-300">
            <div className="grid grid-cols-2 gap-4">
              {[
                { Icon: Camera, title: 'Chụp ảnh', color: 'from-pink-500 to-rose-500' },
                { Icon: Video, title: 'Quay phim', color: 'from-blue-500 to-cyan-500' },
                { Icon: Megaphone, title: 'Marketing', color: 'from-orange-500 to-amber-500' },
                { Icon: Calendar, title: 'Sự kiện', color: 'from-green-500 to-emerald-500' }
              ].map((service, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105 hover:-translate-y-2 group cursor-pointer">
                  <div className={`bg-gradient-to-br ${service.color} p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform`}>
                    <service.Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl font-bold">{service.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 200" className="w-full h-auto" preserveAspectRatio="none" style={{ height: '120px' }}>
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
          <path fill="url(#wave-gradient)" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z" opacity="0.3" />
          <path fill="#f9fafb" d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z" />
        </svg>
      </div>
    </section>
  );
};

export default HomeHero;


