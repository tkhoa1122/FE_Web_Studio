'use client';
import React, { useState } from 'react';
import { Search, Star, Package, Zap, ShoppingCart, Filter, CheckCircle, Camera as CameraIcon, SlidersHorizontal, X } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ScrollToTop from '../../components/common/ScrollToTop';

export default function EquipmentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setPriceRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const categories = [
    { id: 'all', name: 'Tất cả', count: 24 },
    { id: 'camera', name: 'Máy ảnh', count: 8 },
    { id: 'lens', name: 'Ống kính', count: 6 },
    { id: 'lighting', name: 'Đèn chiếu sáng', count: 5 },
    { id: 'accessory', name: 'Phụ kiện', count: 5 }
  ];

  const priceRanges = [
    { id: 'all', name: 'Tất cả mức giá' },
    { id: 'low', name: '< 100.000đ', range: [0, 100000] },
    { id: 'medium', name: '100.000đ - 300.000đ', range: [100000, 300000] },
    { id: 'high', name: '300.000đ - 500.000đ', range: [300000, 500000] },
    { id: 'premium', name: '> 500.000đ', range: [500000, 10000000] }
  ];

  const equipment = [
    {
      id: 1,
      name: 'Sony A7 IV',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
      badge: 'Pro',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-400',
      price: 500000,
      rating: 4.9,
      reviews: 156,
      category: 'camera',
      description: 'Máy ảnh Full-frame 33MP với khả năng quay video 4K 60fps tuyệt vời',
      specs: ['33MP Full-frame', '4K 60fps', 'IBIS 5.5 stops', 'Dual card slot'],
      available: true,
      stock: 3
    },
    {
      id: 2,
      name: 'Canon EOS R5',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
      badge: 'Hot',
      badgeColor: 'bg-gradient-to-r from-red-500 to-pink-500',
      price: 600000,
      rating: 5.0,
      reviews: 203,
      category: 'camera',
      description: 'Máy ảnh chuyên nghiệp 45MP với khả năng quay video 8K RAW',
      specs: ['45MP Full-frame', '8K 30fps', 'IBIS 8 stops', 'CFexpress'],
      available: true,
      stock: 2
    },
    {
      id: 3,
      name: 'Sony FE 24-70mm f/2.8 GM II',
      image: 'https://images.unsplash.com/photo-1606983340077-61743847e8e1?w=800',
      badge: 'New',
      badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      price: 300000,
      rating: 4.8,
      reviews: 98,
      category: 'lens',
      description: 'Ống kính zoom đa năng với chất lượng hình ảnh xuất sắc',
      specs: ['24-70mm f/2.8', 'GM Series', 'Weather sealed', 'XD Linear Motor'],
      available: true,
      stock: 5
    },
    {
      id: 4,
      name: 'Godox AD600Pro',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
      badge: 'Pro',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-400',
      price: 200000,
      rating: 4.7,
      reviews: 134,
      category: 'lighting',
      description: 'Đèn flash studio 600Ws với pin lithium mạnh mẽ và bền bỉ',
      specs: ['600Ws Power', 'TTL/HSS', 'Lithium Battery', '500 full power flashes'],
      available: true,
      stock: 4
    },
    {
      id: 5,
      name: 'Aputure 300d II',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
      badge: 'Hot',
      badgeColor: 'bg-gradient-to-r from-red-500 to-pink-500',
      price: 250000,
      rating: 4.9,
      reviews: 167,
      category: 'lighting',
      description: 'Đèn LED Daylight 300W với độ sáng cao và CRI 96+',
      specs: ['300W LED', 'CRI 96+', 'Bowens Mount', 'Wireless control'],
      available: true,
      stock: 6
    },
    {
      id: 6,
      name: 'DJI Ronin RS3 Pro',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
      badge: 'New',
      badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      price: 150000,
      rating: 4.8,
      reviews: 89,
      category: 'accessory',
      description: 'Gimbal chuyên nghiệp cho máy ảnh DSLR/Mirrorless nặng tới 4.5kg',
      specs: ['4.5kg Payload', 'OLED Screen', 'Auto-tune', 'ActiveTrack 4.0'],
      available: true,
      stock: 4
    },
    {
      id: 7,
      name: 'Canon RF 50mm f/1.2L',
      image: 'https://images.unsplash.com/photo-1606983340077-61743847e8e1?w=800',
      badge: 'Pro',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-400',
      price: 280000,
      rating: 5.0,
      reviews: 176,
      category: 'lens',
      description: 'Ống kính cố định cao cấp với khẩu độ f/1.2 siêu sáng',
      specs: ['50mm f/1.2', 'L Series', '10 blade aperture', 'Nano USM'],
      available: true,
      stock: 3
    },
    {
      id: 8,
      name: 'Manfrotto 055 Pro',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800',
      badge: 'Hot',
      badgeColor: 'bg-gradient-to-r from-red-500 to-pink-500',
      price: 80000,
      rating: 4.6,
      reviews: 234,
      category: 'accessory',
      description: 'Chân máy nhôm chuyên nghiệp với độ ổn định cao',
      specs: ['9kg Load capacity', 'Aluminum', '170cm Height', 'Horizontal column'],
      available: true,
      stock: 8
    },
    {
      id: 9,
      name: 'Nanlite PavoTube 30C',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
      badge: 'New',
      badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      price: 120000,
      rating: 4.7,
      reviews: 67,
      category: 'lighting',
      description: 'Đèn LED tube RGB với nhiều hiệu ứng ánh sáng sáng tạo',
      specs: ['RGB Full color', '36000K-10000K', 'Built-in battery', 'App control'],
      available: true,
      stock: 7
    }
  ];

  const filteredEquipment = equipment.filter(item => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchPrice = selectedPriceRange === 'all' || (() => {
      const range = priceRanges.find(r => r.id === selectedPriceRange);
      if (!range || !range.range) return true;
      return item.price >= range.range[0] && item.price <= range.range[1];
    })();
    const matchSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRating = item.rating >= minRating;
    
    return matchCategory && matchPrice && matchSearch && matchRating;
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange('all');
    setMinRating(0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Thiết bị cho thuê
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Trang bị đầy đủ công cụ cần thiết cho dự án sáng tạo của bạn với thiết bị chuyên nghiệp, giá cả hợp lý
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
                  placeholder="Tìm kiếm thiết bị..."
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Loại thiết bị</label>
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

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Khoảng giá</label>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                  >
                    {priceRanges.map(range => (
                      <option key={range.id} value={range.id}>{range.name}</option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đánh giá tối thiểu: {minRating} ⭐
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
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
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
                <span className="ml-2 text-sm opacity-75">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Tìm thấy {filteredEquipment.length} thiết bị
            </h2>
            <select className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900 font-medium">
              <option>Mới nhất</option>
              <option>Giá thấp đến cao</option>
              <option>Giá cao đến thấp</option>
              <option>Đánh giá cao nhất</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map(item => (
              <article
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`${item.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-bold text-gray-900">{item.rating}</span>
                    <span className="text-xs text-gray-600">({item.reviews})</span>
                  </div>

                  {/* Stock Status */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Còn {item.stock} sản phẩm
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#667EEA] transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Specs */}
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {item.specs.slice(0, 2).map((spec, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-[#667EEA]" />
                          <span>{spec}</span>
                        </span>
                      ))}
                      {item.specs.length > 2 && (
                        <span className="text-xs text-[#667EEA] font-semibold">+{item.specs.length - 2}</span>
                      )}
                    </div>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[#667EEA]">
                        {formatPrice(item.price)} ₫
                      </p>
                      <p className="text-xs text-gray-500">/ ngày thuê</p>
                    </div>
                    <button className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Thuê ngay</span>
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

      <ScrollToTop />
      <Footer />
    </div>
  );
}

