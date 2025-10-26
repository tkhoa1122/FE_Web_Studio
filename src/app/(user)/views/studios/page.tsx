'use client';
import React, { useState } from 'react';
import { Search, MapPin, Users, Maximize2, Star, Camera, Video, Wifi, Coffee, CheckCircle, SlidersHorizontal, X } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ScrollToTop from '../../components/common/ScrollToTop';
import { PageTransition } from '../../components/common/PageTransition';
import { StaggeredSections } from '../../components/common/StaggeredAnimation';

export default function StudiosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [minCapacity, setMinCapacity] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả', count: 12 },
    { id: 'photo', name: 'Chụp ảnh', count: 5 },
    { id: 'video', name: 'Quay phim', count: 4 },
    { id: 'event', name: 'Sự kiện', count: 3 }
  ];

  const areaFilters = [
    { id: 'all', name: 'Tất cả diện tích' },
    { id: 'small', name: '< 50m²', range: [0, 50] },
    { id: 'medium', name: '50-100m²', range: [50, 100] },
    { id: 'large', name: '100-200m²', range: [100, 200] },
    { id: 'xlarge', name: '> 200m²', range: [200, 1000] }
  ];

  const locations = [
    { id: 'all', name: 'Tất cả khu vực' },
    { id: 'q1', name: 'Quận 1' },
    { id: 'q3', name: 'Quận 3' },
    { id: 'q7', name: 'Quận 7' },
    { id: 'q10', name: 'Quận 10' },
    { id: 'q2', name: 'Quận 2' },
    { id: 'bt', name: 'Bình Thạnh' }
  ];

  const studios = [
    {
      id: 1,
      name: 'Studio A1',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      badge: 'Pro',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-400',
      price: 300000,
      area: 80,
      capacity: 15,
      rating: 4.8,
      reviews: 120,
      description: 'Studio chuyên nghiệp với đầy đủ thiết bị hiện đại, ánh sáng tự nhiên tuyệt vời',
      features: ['Đèn LED chuyên nghiệp', 'Background đa dạng', 'Wifi tốc độ cao', 'Khu vực nghỉ ngơi'],
      type: 'photo',
      location: 'Quận 1, TP.HCM'
    },
    {
      id: 2,
      name: 'Studio B2',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      badge: 'Hot',
      badgeColor: 'bg-gradient-to-r from-red-500 to-pink-500',
      price: 500000,
      area: 120,
      capacity: 25,
      rating: 4.9,
      reviews: 89,
      description: 'Không gian rộng rãi, phù hợp cho quay phim và sự kiện quy mô trung bình',
      features: ['Green screen 5x3m', 'Hệ thống âm thanh', 'Máy lạnh', 'Bãi đỗ xe'],
      type: 'video',
      location: 'Quận 3, TP.HCM'
    },
    {
      id: 3,
      name: 'Studio C3',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800',
      badge: 'New',
      badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      price: 400000,
      area: 95,
      capacity: 20,
      rating: 4.7,
      reviews: 56,
      description: 'Studio mới với thiết kế hiện đại, trang bị đầy đủ phụ kiện chụp ảnh',
      features: ['Cyclorama wall', 'Đèn Godox 600W', 'Máy ảnh cho thuê', 'Phòng makeup'],
      type: 'photo',
      location: 'Quận 7, TP.HCM'
    },
    {
      id: 4,
      name: 'Studio D4',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
      badge: 'Pro',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-400',
      price: 350000,
      area: 70,
      capacity: 12,
      rating: 4.6,
      reviews: 78,
      description: 'Studio chuyên chụp sản phẩm, có bàn chụp và đèn chuyên dụng',
      features: ['Bàn chụp sản phẩm', 'Đèn LED panel', 'Backdrop trắng', 'Tripod'],
      type: 'photo',
      location: 'Quận 10, TP.HCM'
    },
    {
      id: 5,
      name: 'Studio E5',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
      badge: 'Hot',
      badgeColor: 'bg-gradient-to-r from-red-500 to-pink-500',
      price: 600000,
      area: 150,
      capacity: 30,
      rating: 5.0,
      reviews: 145,
      description: 'Studio cao cấp với không gian siêu rộng, phù hợp cho event và workshop',
      features: ['Sân khấu mini', 'Hệ thống ánh sáng đẳng cấp', 'Phòng họp', 'Catering'],
      type: 'event',
      location: 'Quận 2, TP.HCM'
    },
    {
      id: 6,
      name: 'Studio F6',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
      badge: 'New',
      badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      price: 450000,
      area: 110,
      capacity: 18,
      rating: 4.8,
      reviews: 92,
      description: 'Studio đa năng với nhiều góc chụp độc đáo và thiết bị hiện đại',
      features: ['Multi-angle setup', 'Đèn Continuous', 'Props đa dạng', 'WiFi 6'],
      type: 'video',
      location: 'Bình Thạnh, TP.HCM'
    }
  ];

  const filteredStudios = studios.filter(studio => {
    const matchCategory = selectedCategory === 'all' || studio.type === selectedCategory;
    const matchArea = selectedArea === 'all' || (() => {
      const filter = areaFilters.find(f => f.id === selectedArea);
      if (!filter || !filter.range) return true;
      return studio.area >= filter.range[0] && studio.area < filter.range[1];
    })();
    const matchSearch = searchQuery === '' || 
      studio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = studio.price >= priceRange.min && studio.price <= priceRange.max;
    const matchCapacity = studio.capacity >= minCapacity;
    const matchLocation = selectedLocation === 'all' || studio.location.includes(locations.find(l => l.id === selectedLocation)?.name || '');
    
    return matchCategory && matchArea && matchSearch && matchPrice && matchCapacity && matchLocation;
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedArea('all');
    setPriceRange({ min: 0, max: 1000000 });
    setMinCapacity(0);
    setSelectedLocation('all');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
      <Header />

      <StaggeredSections staggerDelay={150}>
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Studios - Không gian sáng tạo
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Khám phá không gian studio đa dạng với đầy đủ tiện nghi cho mọi dự án sáng tạo của bạn
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 bg-white border-b sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm studio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                />
              </div>
              <button
                onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  showAdvancedFilter
                    ? 'bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Bộ lọc nâng cao</span>
              </button>
            </div>
          </div>

          {/* Advanced Filter Panel */}
          {showAdvancedFilter && (
            <div className="bg-gray-50 rounded-2xl p-6 mb-6 animate-in slide-in-from-top">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Loại hình</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Khu vực</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                  >
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giá: {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)} ₫/giờ
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                    />
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sức chứa tối thiểu: {minCapacity} người
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="5"
                    value={minCapacity}
                    onChange={(e) => setMinCapacity(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={resetFilters}
                  className="flex items-center space-x-2 px-6 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-all"
                >
                  <X className="w-4 h-4" />
                  <span>Xóa bộ lọc</span>
                </button>
                <button
                  onClick={() => setShowAdvancedFilter(false)}
                  className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Áp dụng
                </button>
              </div>
            </div>
          )}

          {/* Quick Filters */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <span className="text-gray-700 font-semibold whitespace-nowrap">Lọc nhanh:</span>
            {areaFilters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedArea(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedArea === filter.id
                    ? 'bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Studios Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Tìm thấy {filteredStudios.length} studio
            </h2>
            <select className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900 font-medium">
              <option>Mới nhất</option>
              <option>Giá thấp đến cao</option>
              <option>Giá cao đến thấp</option>
              <option>Đánh giá cao nhất</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudios.map(studio => (
              <article
                key={studio.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={studio.image}
                    alt={studio.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`${studio.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                      {studio.badge}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-bold text-gray-900">{studio.rating}</span>
                    <span className="text-xs text-gray-600">({studio.reviews})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#667EEA] transition-colors">
                    {studio.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {studio.description}
                  </p>

                  {/* Info */}
                  <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-gray-100">
                    <div className="text-center">
                      <Maximize2 className="w-4 h-4 text-[#667EEA] mx-auto mb-1" />
                      <p className="text-xs text-gray-600">{studio.area}m²</p>
                    </div>
                    <div className="text-center">
                      <Users className="w-4 h-4 text-[#667EEA] mx-auto mb-1" />
                      <p className="text-xs text-gray-600">{studio.capacity} người</p>
                    </div>
                    <div className="text-center">
                      <MapPin className="w-4 h-4 text-[#667EEA] mx-auto mb-1" />
                      <p className="text-xs text-gray-600 truncate">{studio.location}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {studio.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-[#667EEA]" />
                          <span>{feature}</span>
                        </span>
                      ))}
                      {studio.features.length > 2 && (
                        <span className="text-xs text-[#667EEA] font-semibold">+{studio.features.length - 2}</span>
                      )}
                    </div>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[#667EEA]">
                        {formatPrice(studio.price)} ₫
                      </p>
                      <p className="text-xs text-gray-500">/ giờ thuê studio</p>
                    </div>
                    <button className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
                      Đặt ngay
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-700 hover:border-[#667EEA] hover:text-[#667EEA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            {[1, 2, 3].map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white'
                    : 'border-2 border-gray-200 text-gray-700 hover:border-[#667EEA] hover:text-[#667EEA]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === 3}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-700 hover:border-[#667EEA] hover:text-[#667EEA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </div>
        </div>
      </section>
      </StaggeredSections>

      <ScrollToTop />
      <Footer />
      </div>
    </PageTransition>
  );
}

