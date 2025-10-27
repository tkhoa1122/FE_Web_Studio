'use client';
import React from 'react';
import { Camera, Video, Megaphone, Calendar, CheckCircle, Star, Award, Clock, Users } from 'lucide-react';

import Header from '../(user)/components/layout/Header';
import Footer from '../(user)/components/layout/Footer';
import PricingCard from '../(user)/components/common/PricingCard';
import GalleryGrid from '../(user)/components/common/GalleryGrid';
import { PageTransition } from '../(user)/components/common/PageTransition';
import { StaggeredSections } from '../(user)/components/common/StaggeredAnimation';
import { mockStudioPackages } from '../../services/data/mockData';
import { StudioPackageDTO } from '../../domain/dto/StudioDTO';

export default function HomePage() {
  const handleBookNow = (packageId: string) => {
    console.log('Booking package:', packageId);
    // TODO: Navigate to booking page
  };

  const galleryImages = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      title: 'Studio Setup',
      type: 'photo' as const,
      category: 'Setup'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      title: 'Photography Session',
      type: 'photo' as const,
      category: 'Photography'
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800',
      title: 'Video Production',
      type: 'video' as const,
      category: 'Video'
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
      title: 'Team Collaboration',
      type: 'photo' as const,
      category: 'Team'
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
      title: 'Professional Equipment',
      type: 'photo' as const,
      category: 'Equipment'
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      title: 'Creative Workspace',
      type: 'photo' as const,
      category: 'Workspace'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />

      <StaggeredSections staggerDelay={200}>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white min-h-[90vh] flex items-center overflow-hidden pb-32">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">

              <h1 className="text-5xl md:text-7xl lg:text-6xl font-bold leading-tight mb-6 animate-in slide-in-from-left">
                Studio chụp ảnh <span className="bg-white text-transparent bg-clip-text whitespace-nowrap">Hiện đại & Chuyên nghiệp</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0 animate-in slide-in-from-left delay-200">
                Không gian studio hiện đại với thiết bị chuyên nghiệp, 
                phục vụ các công ty quảng cáo, agency truyền thông và 
                đơn vị sản xuất nội dung hàng đầu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-in slide-in-from-left delay-300">
                <button className="bg-white text-[#667EEA] px-8 py-4 text-lg font-bold rounded-xl hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all">
                  Đặt lịch ngay
                </button>
                <button className="border-2 border-white text-white px-8 py-4 text-lg font-bold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all">
                  Xem bảng giá
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 max-w-xl mx-auto md:mx-0 animate-in slide-in-from-left delay-500">
                {[
                  { icon: Award, number: '500+', label: 'Dự án hoàn thành' },
                  { icon: Clock, number: '24/7', label: 'Hỗ trợ khách hàng' },
                  { icon: Users, number: '100+', label: 'Khách hàng tin tưởng' }
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
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105 hover:-translate-y-2 group cursor-pointer"
                  >
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

        {/* Wave Divider - Positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg 
            viewBox="0 0 1440 200" 
            className="w-full h-auto" 
            preserveAspectRatio="none"
            style={{ height: '120px' }}
          >
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
                <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
              </linearGradient>
            </defs>
            {/* Layered waves for depth */}
            <path 
              fill="url(#wave-gradient)" 
              d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
              opacity="0.3"
            />
            <path 
              fill="#f9fafb" 
              d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
            />
          </svg>
        </div>
      </section>

      {/* Studio Space Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-transparent">
              KHÔNG GIAN STUDIO
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Với nhiều lựa chọn không gian rộng rãi, đa dạng thiết bị, 
              phù hợp với nhiều concept khác nhau. Có thể chứa từ 10 - 30 người.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
                  alt="Studio Space"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#667EEA]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            <div className="flex-1">
              <ul className="space-y-6">
                {[
                  'Không gian rộng rãi, thoáng mát',
                  'Thiết bị chuyên nghiệp, hiện đại',
                  'Đa dạng background và phụ kiện',
                  'Phù hợp cho nhiều loại hình sản xuất'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-4 group">
                    <div className="bg-gradient-to-br from-[#667EEA] to-[#764BA2] p-3 rounded-full group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-800 group-hover:text-[#667EEA] transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Photography & Videography Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-transparent">
              CHỤP HAY QUAY ĐỀU ĐƯỢC
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Studio được trang bị đầy đủ thiết bị cho cả chụp ảnh và quay phim, 
              từ cơ bản đến chuyên nghiệp, đáp ứng mọi nhu cầu sản xuất nội dung.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
                  alt="Photography & Videography"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#764BA2]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            <div className="flex-1 space-y-8">
              {[
                { Icon: Camera, title: 'Chụp ảnh chuyên nghiệp', desc: 'Hệ thống đèn LED, flash, background đa dạng', color: 'from-pink-500 to-rose-500' },
                { Icon: Video, title: 'Quay phim 4K', desc: 'Máy quay cao cấp, green screen, hệ thống âm thanh', color: 'from-blue-500 to-cyan-500' },
                { Icon: Megaphone, title: 'Sản xuất nội dung', desc: 'Phù hợp cho quảng cáo, social media, e-commerce', color: 'from-orange-500 to-amber-500' }
              ].map((service, index) => (
                <div key={index} className="flex items-start space-x-4 group cursor-pointer">
                  <div className={`bg-gradient-to-br ${service.color} p-4 rounded-2xl group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <service.Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#667EEA] transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Available Equipment Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-transparent">
              THIẾT BỊ CÓ SẴN
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Đầy đủ thiết bị chuyên nghiệp từ máy ảnh, đèn chiếu sáng, 
              đến các phụ kiện hỗ trợ, đảm bảo chất lượng sản xuất tốt nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { src: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800', title: 'Máy ảnh & Lens chuyên nghiệp' },
              { src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800', title: 'Hệ thống đèn chiếu sáng' }
            ].map((equipment, index) => (
              <div key={index} className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                <img
                  src={equipment.src}
                  alt={equipment.title}
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#667EEA] via-[#764BA2]/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold">{equipment.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-transparent">
              CHUYÊN NGHIỆP
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Đội ngũ nhân viên giàu kinh nghiệm, thiết bị cao cấp, 
              dịch vụ hỗ trợ 24/7 đảm bảo chất lượng tốt nhất cho khách hàng.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200"
              alt="Professional Studio"
              className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#667EEA]/90 via-[#764BA2]/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
              <h3 className="text-4xl font-bold mb-4">Trải nghiệm dịch vụ đẳng cấp</h3>
              <p className="text-xl text-white/90 max-w-2xl">
                Chúng tôi cam kết mang đến trải nghiệm tuyệt vời nhất với đội ngũ chuyên nghiệp và thiết bị hiện đại.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-[#667EEA] to-[#764BA2] relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Bảng giá Studio
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Lựa chọn gói phù hợp với nhu cầu của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {mockStudioPackages.map((packageData: StudioPackageDTO) => (
              <PricingCard
                key={packageData.id}
                packageData={packageData}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <GalleryGrid images={galleryImages} />
        </div>
      </section>
      </StaggeredSections>

      <Footer />
      </div>
    </PageTransition>
  );
}
