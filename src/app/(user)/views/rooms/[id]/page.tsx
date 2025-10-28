'use client';
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Camera, 
  Lightbulb, 
  Mic, 
  Video, 
  Package,
  CheckCircle,
  Star,
  Users,
  Calendar,
  DollarSign,
  Shield,
  Wifi,
  Coffee,
  Car,
  ShowerHead,
  X
} from 'lucide-react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import ScrollToTop from '../../../components/common/ScrollToTop';
import { PageTransition } from '../../../components/common/PageTransition';
import { StaggeredSections } from '../../../components/common/StaggeredAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/application/redux/store';
import { fetchRoomById, fetchEquipmentsByRoomId } from '@/application/redux/services/RoomService';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function RoomDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedRoom, equipments, loading, error } = useSelector((state: RootState) => state.rooms);
  const params = useParams();
  const roomId = parseInt(params.id as string);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    if (roomId) {
      dispatch(fetchRoomById(roomId));
    }
  }, [dispatch, roomId]);

  // Fallback: nếu room.equipments rỗng, fetch theo roomId
  useEffect(() => {
    if (selectedRoom && selectedRoom.roomid === roomId && (!selectedRoom.equipments || selectedRoom.equipments.length === 0)) {
      dispatch(fetchEquipmentsByRoomId(roomId));
    }
  }, [dispatch, selectedRoom, roomId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getEquipmentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'light':
        return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'camera':
        return <Camera className="w-5 h-5 text-blue-500" />;
      case 'audio':
        return <Mic className="w-5 h-5 text-green-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getUtilityIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'điều hòa':
        return <Coffee className="w-4 h-4" />;
      case 'chỗ đậu xe':
        return <Car className="w-4 h-4" />;
      case 'phòng thay đồ':
        return <ShowerHead className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" fullScreen={false} message="Đang tải thông tin phòng..." />
      </div>
    );
  }

  if (error || !selectedRoom) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy phòng</h2>
          <p className="text-gray-600 mb-4">{error || 'Phòng không tồn tại'}</p>
          <Link 
            href="/views/studios"
            className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const images = selectedRoom.images.length > 0 ? selectedRoom.images : [
    { roomImageId: 0, imageLink: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', roomid: selectedRoom.roomid }
  ];

  // Determine equipments to display
  const displayedEquipments = (selectedRoom.equipments && selectedRoom.equipments.length > 0)
    ? selectedRoom.equipments
    : equipments.filter(eq => eq.roomid === roomId).map(eq => ({
        equipmentid: eq.equipmentid as any,
        roomid: eq.roomid,
        equipmenttype: eq.equipmenttype,
        equipmentname: eq.equipmentname,
        quantity: eq.quantity,
        price: (eq as any).price || undefined as any,
        isavailable: eq.isavailable,
      }));

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <StaggeredSections staggerDelay={150}>
          {/* Breadcrumb */}
          <section className="py-4 bg-white border-b">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/views/studios" className="hover:text-[#667EEA] transition-colors">
                  Studios
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-semibold">{selectedRoom.roomtype}</span>
              </div>
            </div>
          </section>

          {/* Room Header */}
          <section className="py-8 bg-white">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex items-center justify-between mb-6">
                <Link 
                  href="/views/studios"
                  className="flex items-center space-x-2 text-gray-600 hover:text-[#667EEA] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Quay lại</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Room Info */}
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedRoom.roomtype}</h1>
                  <p className="text-lg text-gray-600 mb-6">{selectedRoom.description}</p>
                  
                  {/* Key Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#667EEA] to-[#764BA2] rounded-xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Giá thuê</p>
                        <p className="text-xl font-bold text-gray-900">{formatPrice(parseFloat(selectedRoom.price))} ₫/giờ</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Giờ hoạt động</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedRoom.checkintime} - {selectedRoom.checkouttime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-3 mb-6">
                    <MapPin className="w-5 h-5 text-[#667EEA] mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Địa chỉ</p>
                      <p className="text-gray-900">{selectedRoom.address}</p>
                    </div>
                  </div>

                  {/* Deposit */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-6 h-6 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-600">Cọc yêu cầu</p>
                        <p className="text-lg font-semibold text-gray-900">{formatPrice(parseFloat(selectedRoom.depositrequired))} ₫</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Image */}
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden">
                    <img
                      src={images[selectedImageIndex]?.imageLink || selectedRoom.banner}
                      alt={selectedRoom.roomtype}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setShowImageModal(true)}
                    />
                  </div>
                  
                  {/* Image Thumbnails */}
                  {images.length > 1 && (
                    <div className="flex space-x-2 mt-4">
                      {images.map((image, index) => (
                        <button
                          key={image.roomImageId}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImageIndex === index 
                              ? 'border-[#667EEA]' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={image.imageLink}
                            alt={`${selectedRoom.roomtype} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Utilities */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 md:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Tiện ích có sẵn</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedRoom.utilities.map((utility, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    {getUtilityIcon(utility.utilityname)}
                    <span className="font-semibold text-gray-900">{utility.utilityname}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Equipment */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Thiết bị có sẵn</h2>
              
              {displayedEquipments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedEquipments.map((equipment, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {('image' in equipment) && (equipment as any).image ? (
                            <img src={(equipment as any).image} alt={equipment.equipmentname} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              {getEquipmentIcon(equipment.equipmenttype)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{equipment.equipmentname}</h3>
                          <p className="text-sm text-gray-600 mb-2">{equipment.equipmenttype}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Số lượng: {equipment.quantity}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              equipment.isavailable 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {equipment.isavailable ? 'Có sẵn' : 'Không có sẵn'}
                            </span>
                          </div>
                          {('price' in equipment) && (equipment as any).price && (
                            <p className="text-sm text-[#667EEA] font-semibold mt-2">
                              {formatPrice(parseFloat((equipment as any).price))} ₫/giờ
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Phòng này chưa có thiết bị bổ sung</p>
                </div>
              )}
            </div>
          </section>

          {/* Booking CTA */}
          <section className="py-12 bg-gradient-to-r from-[#667EEA] to-[#764BA2]">
            <div className="container mx-auto px-4 md:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Sẵn sàng đặt phòng?</h2>
              <p className="text-white/90 mb-8 text-lg">
                Đặt ngay để đảm bảo có phòng cho dự án của bạn
              </p>
              <Link
                href={`/views/booking?roomId=${selectedRoom.roomid}`}
                className="inline-flex items-center space-x-2 bg-white text-[#667EEA] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <Calendar className="w-6 h-6" />
                <span>Đặt phòng ngay</span>
              </Link>
            </div>
          </section>
        </StaggeredSections>

        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={images[selectedImageIndex]?.imageLink || selectedRoom.banner}
                alt={selectedRoom.roomtype}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}

        <ScrollToTop />
        <Footer />
      </div>
    </PageTransition>
  );
}
