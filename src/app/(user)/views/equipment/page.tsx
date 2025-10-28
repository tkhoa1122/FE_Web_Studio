'use client';
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Camera, 
  Lightbulb, 
  Mic, 
  Video, 
  Package,
  MapPin,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ScrollToTop from '../../components/common/ScrollToTop';
import { PageTransition } from '../../components/common/PageTransition';
import { StaggeredSections } from '../../components/common/StaggeredAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/application/redux/store';
import { fetchAllEquipments, fetchAllRooms } from '@/application/redux/services/RoomService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Link from 'next/link';

export default function EquipmentCatalogPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { equipments, rooms, loading, error } = useSelector((state: RootState) => state.rooms);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    dispatch(fetchAllEquipments());
    dispatch(fetchAllRooms());
  }, [dispatch]);

  const equipmentTypes = [
    { id: 'all', name: 'Tất cả', icon: <Package className="w-4 h-4" /> },
    { id: 'Light', name: 'Đèn chiếu sáng', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'Camera', name: 'Máy ảnh', icon: <Camera className="w-4 h-4" /> },
    { id: 'Audio', name: 'Âm thanh', icon: <Mic className="w-4 h-4" /> },
    { id: 'Video', name: 'Video', icon: <Video className="w-4 h-4" /> }
  ];

  const filteredEquipments = equipments.filter(equipment => {
    const matchType = selectedType === 'all' || equipment.equipmenttype === selectedType;
    const matchRoom = selectedRoom === 'all' || equipment.roomid.toString() === selectedRoom;
    const matchSearch = searchQuery === '' || 
      equipment.equipmentname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.equipmenttype.toLowerCase().includes(searchQuery.toLowerCase());
    const matchAvailability = !showAvailableOnly || equipment.isavailable;
    
    return matchType && matchRoom && matchSearch && matchAvailability;
  });

  const totalPages = Math.ceil(filteredEquipments.length / ITEMS_PER_PAGE);
  const paginatedEquipments = filteredEquipments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getEquipmentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'light':
        return <Lightbulb className="w-6 h-6 text-yellow-500" />;
      case 'camera':
        return <Camera className="w-6 h-6 text-blue-500" />;
      case 'audio':
        return <Mic className="w-6 h-6 text-green-500" />;
      case 'video':
        return <Video className="w-6 h-6 text-purple-500" />;
      default:
        return <Package className="w-6 h-6 text-gray-500" />;
    }
  };

  const getRoomName = (roomId: number) => {
    const room = rooms.find(r => r.roomid === roomId);
    return room ? room.roomtype : `Phòng ${roomId}`;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedRoom('all');
    setShowAvailableOnly(false);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner 
          size="lg" 
          fullScreen={false} 
          message="Đang tải danh sách thiết bị..." 
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => {
              dispatch(fetchAllEquipments());
              dispatch(fetchAllRooms());
            }}
            className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <StaggeredSections staggerDelay={150}>
          {/* Hero */}
          <section className="relative bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white py-16 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Danh mục thiết bị</h1>
                <p className="text-lg md:text-xl text-white/90">Thiết bị chuyên nghiệp có sẵn tại các phòng studio</p>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="py-6 bg-white border-b sticky top-16 z-40 shadow-sm">
            <div className="container mx-auto px-4 md:px-8">
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
                    <Filter className="w-5 h-5" />
                    <span>Bộ lọc nâng cao</span>
                  </button>
                </div>
              </div>

              {showAdvancedFilter && (
                <div className="bg-gray-50 rounded-2xl p-6 mb-6 animate-in slide-in-from-top">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Loại thiết bị</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                      >
                        {equipmentTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phòng</label>
                      <select
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                      >
                        <option value="all">Tất cả phòng</option>
                        {rooms.map(room => (
                          <option key={room.roomid} value={room.roomid.toString()}>
                            {room.roomtype}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Trạng thái</label>
                      <label className="inline-flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={showAvailableOnly}
                          onChange={(e) => setShowAvailableOnly(e.target.checked)}
                          className="rounded border-gray-300 text-[#667EEA] focus:ring-[#667EEA]"
                        />
                        <span>Chỉ hiển thị có sẵn</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={resetFilters}
                      className="flex items-center space-x-2 px-6 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-all"
                    >
                      <X className="w-4 h-4" />
                      <span>Xóa bộ lọc</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Equipment Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Tìm thấy {filteredEquipments.length} thiết bị</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedEquipments.map((equipment, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
                  >
                    <div className="relative h-44 bg-gray-100">
                      {equipment.image ? (
                        <img src={equipment.image} alt={equipment.equipmentname} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Package className="w-10 h-10" />
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getEquipmentIcon(equipment.equipmenttype)}
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{equipment.equipmentname}</h3>
                            <p className="text-sm text-gray-600">{equipment.equipmenttype}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          equipment.isavailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {equipment.isavailable ? 'Có sẵn' : 'Hết hàng'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Số lượng: <strong className="text-gray-900">{equipment.quantity}</strong></span>
                        <Link href={`/views/rooms/${equipment.roomid}`} className="text-[#667EEA] hover:text-[#764BA2] font-semibold">
                          {getRoomName(equipment.roomid)} →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {paginatedEquipments.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Package className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p className="text-lg font-medium">Không tìm thấy thiết bị nào</p>
                  <p className="text-sm">Hãy thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-12">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-700 hover:border-[#667EEA] hover:text-[#667EEA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-700 hover:border-[#667EEA] hover:text-[#667EEA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </section>
        </StaggeredSections>

        <ScrollToTop />
        <Footer />
      </div>
    </PageTransition>
  );
}


