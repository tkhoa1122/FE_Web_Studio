
'use client';
import React, { useState, useEffect } from 'react';
import { Camera, Video, Megaphone, Calendar, CheckCircle, Star, Award, Clock, Users, MapPin, Lightbulb, Package, ArrowRight, Mic } from 'lucide-react';
import HomeHero from './(user)/components/home/HomeHero';

import Header from './(user)/components/layout/Header';
import Footer from './(user)/components/layout/Footer';
import PricingCard from './(user)/components/common/PricingCard';
import HomePricing from './(user)/components/home/HomePricing';
import { PageTransition } from './(user)/components/common/PageTransition';
import { StaggeredSections } from './(user)/components/common/StaggeredAnimation';
import { mockStudioPackages } from '../services/data/mockData';
import { StudioPackageDTO } from '../domain/dto/StudioDTO';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/application/redux/store';
import { fetchAllRooms, fetchAllEquipments } from '@/application/redux/services/RoomService';
import LoadingSpinner from './(user)/components/common/LoadingSpinner';
import Link from 'next/link';

export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { rooms, equipments, loading } = useSelector((state: RootState) => state.rooms);

    useEffect(() => {
        dispatch(fetchAllRooms());
        dispatch(fetchAllEquipments());
    }, [dispatch]);

    const handleBookNow = (packageId: string) => {
        console.log('Booking package:', packageId);
        // TODO: Navigate to booking page
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const getEquipmentIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'light':
                return <Lightbulb className="w-4 h-4 text-yellow-500" />;
            case 'camera':
                return <Camera className="w-4 h-4 text-blue-500" />;
            case 'audio':
                return <Mic className="w-4 h-4 text-green-500" />;
            case 'video':
                return <Video className="w-4 h-4 text-purple-500" />;
            default:
                return <Package className="w-4 h-4 text-gray-500" />;
        }
    };

    // Get featured rooms (first 3 rooms)
    const featuredRooms = rooms.slice(0, 3);
    const featuredEquipImages = equipments
        .filter((e) => (e as any).image)
        .map((e) => (e as any).image as string)
        .slice(0, 6);
    const featuredRoomImages = rooms
        .flatMap((r) => [r.banner, ...(r.images?.map((im) => im.imageLink) || [])])
        .filter(Boolean)
        .slice(0, 6) as string[];

    const CAMERA_HERO = '/4547353_Cover-Sony.jpg';
    const LIGHT_HERO = '/cung-tim-hieu-5-phuong-phap-danh-den-studio-can-ban_photozone-com-vn-10.jpg';
    // Helper to get studio images for hero/sections
    const getRoomImageByIndex = (index: number) => {
        if (!rooms || rooms.length === 0) return '';
        const room = rooms[index % rooms.length];
        return room.banner || room.images?.[0]?.imageLink || '';
    };

    const primaryImage = getRoomImageByIndex(0);
    const secondaryImage = getRoomImageByIndex(1);
    const tertiaryImage = getRoomImageByIndex(2);
    // Removed featured equipments on homepage per requirement

    return (
        <PageTransition>
            <div className="min-h-screen bg-gray-50">
                <Header />

                <StaggeredSections staggerDelay={200}>
                    <HomeHero />

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
                                            src={primaryImage || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'}
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

                    {/* Featured Images (Hình ảnh nổi bật) */}
                    <section className="py-12 bg-gradient-to-br from-[#764BA2] to-[#667EEA]">
                        <div className="container mx-auto px-4 md:px-8">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Hình ảnh nổi bật</h3>
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                                {(featuredRoomImages.length ? featuredRoomImages : featuredEquipImages).slice(0,5).map((src, idx) => (
                                    <div key={idx} className="rounded-xl overflow-hidden shadow-md bg-white/10">
                                        <img src={src} alt={`featured-${idx}`} className="w-full h-28 object-cover" />
                                    </div>
                                ))}
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
                                            src={secondaryImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'}
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
                                {(equipments.length ? equipments.slice(0,2) : []).map((e, index) => (
                                    <div key={index} className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                                        <img
                                            src={
                                                e.equipmenttype === 'Camera'
                                                    ? CAMERA_HERO
                                                    : e.equipmenttype === 'Light'
                                                        ? LIGHT_HERO
                                                        : (e as any).image || 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800'
                                            }
                                            alt={e.equipmentname}
                                            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#667EEA] via-[#764BA2]/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <h3 className="text-2xl font-bold">{e.equipmenttype === 'Camera' ? 'Máy ảnh & Lens chuyên nghiệp' : e.equipmenttype === 'Light' ? 'Hệ thống đèn chiếu sáng' : e.equipmentname}</h3>
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
                                    src={tertiaryImage || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200'}
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

                    <HomePricing onBookNow={handleBookNow} />

                    {/* Featured Studios Section */}
                    <section className="py-20 bg-white">
                        <div className="container mx-auto px-4 md:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-transparent">
                                    STUDIO NỔI BẬT
                                </h2>
                                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                    Khám phá các studio được yêu thích nhất với thiết bị hiện đại và không gian chuyên nghiệp
                                </p>
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <LoadingSpinner size="lg" fullScreen={false} message="Đang tải danh sách studio..." />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {featuredRooms.map((room) => (
                                        <div
                                            key={room.roomid}
                                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
                                        >
                                            {/* Room Image */}
                                            <div className="relative h-64 overflow-hidden">
                                                <img
                                                    src={room.banner || room.images[0]?.imageLink || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'}
                                                    alt={room.roomtype}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                                {/* Badge */}
                                                <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {room.roomtype}
                      </span>
                                                </div>

                                                {/* Equipment Count */}
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                                                    <Package className="w-4 h-4 text-[#667EEA]" />
                                                    <span className="text-sm font-bold text-gray-900">{room.equipments.length}</span>
                                                    <span className="text-xs text-gray-600">thiết bị</span>
                                                </div>
                                            </div>

                                            {/* Room Content */}
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#667EEA] transition-colors">
                                                    {room.roomtype}
                                                </h3>

                                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                    {room.description}
                                                </p>

                                                {/* Room Info */}
                                                <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100">
                                                    <div className="flex items-center space-x-2">
                                                        <MapPin className="w-4 h-4 text-[#667EEA]" />
                                                        <span className="text-xs text-gray-600 truncate">{room.address}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Clock className="w-4 h-4 text-[#667EEA]" />
                                                        <span className="text-xs text-gray-600">{room.checkintime} - {room.checkouttime}</span>
                                                    </div>
                                                </div>

                                                {/* Utilities */}
                                                <div className="mb-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {room.utilities.slice(0, 2).map((utility, idx) => (
                                                            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-[#667EEA]" />
                            <span>{utility.utilityname}</span>
                          </span>
                                                        ))}
                                                        {room.utilities.length > 2 && (
                                                            <span className="text-xs text-[#667EEA] font-semibold">+{room.utilities.length - 2}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Price and Button */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-2xl font-bold text-[#667EEA]">
                                                            {formatPrice(parseFloat(room.price))} ₫
                                                        </p>
                                                        <p className="text-xs text-gray-500">/ giờ</p>
                                                    </div>
                                                    <Link
                                                        href={`/views/rooms/${room.roomid}`}
                                                        className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all text-sm"
                                                    >
                                                        Xem chi tiết
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* View All Button */}
                            <div className="text-center mt-12">
                                <Link
                                    href="/views/studios"
                                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
                                >
                                    <span>Xem tất cả studio</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Removed Featured Equipment Section per requirement */}
                </StaggeredSections>

                <Footer />
            </div>
        </PageTransition>
    );
}