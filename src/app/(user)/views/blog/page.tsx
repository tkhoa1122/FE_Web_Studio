'use client';
import React, { useState } from 'react';
import { Calendar, Clock, User, Tag, Search, TrendingUp, ArrowRight, Eye, Heart, MessageCircle } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả', count: 12 },
    { id: 'tutorial', name: 'Hướng dẫn', count: 5 },
    { id: 'news', name: 'Tin tức', count: 4 },
    { id: 'tips', name: 'Tips & Tricks', count: 3 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: '10 bí quyết chụp ảnh sản phẩm chuyên nghiệp trong studio',
      excerpt: 'Khám phá những kỹ thuật và mẹo hay giúp bạn tạo ra những bức ảnh sản phẩm ấn tượng và thu hút khách hàng.',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
      author: 'Nguyễn Văn A',
      date: '15/01/2024',
      readTime: '5 phút đọc',
      category: 'tutorial',
      views: 1250,
      likes: 89,
      comments: 23,
      featured: true
    },
    {
      id: 2,
      title: 'Xu hướng chụp ảnh quảng cáo năm 2024',
      excerpt: 'Cập nhật những xu hướng mới nhất trong ngành nhiếp ảnh quảng cáo để tạo ra nội dung độc đáo và bắt kịp thị trường.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      author: 'Trần Thị B',
      date: '10/01/2024',
      readTime: '7 phút đọc',
      category: 'news',
      views: 980,
      likes: 72,
      comments: 18,
      featured: true
    },
    {
      id: 3,
      title: 'Cách sử dụng ánh sáng tự nhiên khi chụp studio',
      excerpt: 'Hướng dẫn chi tiết cách tận dụng ánh sáng tự nhiên để tạo ra những bức ảnh có chiều sâu và cảm xúc.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      author: 'Lê Văn C',
      date: '05/01/2024',
      readTime: '6 phút đọc',
      category: 'tips',
      views: 756,
      likes: 54,
      comments: 12
    },
    {
      id: 4,
      title: 'Setup studio cho người mới bắt đầu',
      excerpt: 'Hướng dẫn chi tiết từng bước để setup một studio chụp ảnh cơ bản với ngân sách hợp lý.',
      image: 'https://images.unsplash.com/photo-1594736797933-d0c0b4b8a8a9?w=800',
      author: 'Phạm Thị D',
      date: '01/01/2024',
      readTime: '10 phút đọc',
      category: 'tutorial',
      views: 1520,
      likes: 105,
      comments: 34
    },
    {
      id: 5,
      title: 'Review thiết bị chụp ảnh studio mới nhất',
      excerpt: 'Đánh giá chi tiết các thiết bị chụp ảnh studio mới ra mắt năm 2024, giúp bạn chọn lựa thiết bị phù hợp.',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800',
      author: 'Hoàng Văn E',
      date: '28/12/2023',
      readTime: '8 phút đọc',
      category: 'news',
      views: 890,
      likes: 67,
      comments: 15
    },
    {
      id: 6,
      title: 'Làm thế nào để tạo background độc đáo cho studio',
      excerpt: 'Khám phá những cách sáng tạo để tạo ra background độc đáo và thu hút cho studio của bạn.',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
      author: 'Võ Thị F',
      date: '20/12/2023',
      readTime: '5 phút đọc',
      category: 'tips',
      views: 645,
      likes: 48,
      comments: 9
    }
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const filteredPosts = selectedCategory === 'all' 
    ? regularPosts 
    : regularPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Blog & Tin tức
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Cập nhật kiến thức, xu hướng và mẹo hay về nhiếp ảnh studio
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative bg-white rounded-2xl shadow-xl p-2 backdrop-blur-sm border-2 border-white/20">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-3 pl-14 pr-32 rounded-xl text-gray-900 text-lg focus:outline-none bg-transparent"
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'all' && (
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-[#667EEA]" />
                <span>Bài viết nổi bật</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        ⭐ Nổi bật
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium mb-2">
                        {categories.find(c => c.id === post.category)?.name}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#667EEA] to-[#764BA2] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{post.author}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2">
                        <span>Đọc tiếp</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-8">
            {selectedCategory === 'all' ? 'Tất cả bài viết' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-[#667EEA] px-3 py-1 rounded-lg text-xs font-bold">
                      {categories.find(c => c.id === post.category)?.name}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#667EEA] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{post.likes}</span>
                      </span>
                    </div>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#667EEA] to-[#764BA2] rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-xs">
                        <p className="font-semibold text-gray-900">{post.author}</p>
                        <p className="text-gray-500">{post.date}</p>
                      </div>
                    </div>
                    <button className="text-[#667EEA] hover:text-[#764BA2] font-semibold text-sm flex items-center space-x-1 group">
                      <span>Đọc thêm</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all">
              Xem thêm bài viết
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-[#667EEA] to-[#764BA2]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Đăng ký nhận tin tức mới nhất
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Nhận thông báo về các bài viết mới, tips hữu ích và ưu đãi đặc biệt
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="bg-white text-[#667EEA] px-8 py-4 rounded-xl font-bold hover:bg-white/90 hover:shadow-xl transition-all">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

