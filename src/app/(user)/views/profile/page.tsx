'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  User,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Search,
  Filter,
  CheckCircle,
  X,
  Loader2,
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ScrollToTop from '../../components/common/ScrollToTop';
import { PageTransition } from '../../components/common/PageTransition';
import { StaggeredSections } from '../../components/common/StaggeredAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/application/redux/store';
import { getUserBookings, getUserInvoices, getInvoiceByBookingId } from '@/application/redux/services/BookingService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Link from 'next/link';
import InvoiceModal from '../../components/common/InvoiceModal';

const STATUS_TABS = [
  { id: 'all', name: 'Tất cả' },
  { id: 'pending', name: 'Chờ xác nhận' },
  { id: 'confirmed', name: 'Đã xác nhận' },
  { id: 'cancelled', name: 'Đã hủy' },
  { id: 'completed', name: 'Hoàn tất' },
];

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { bookings, invoices, selectedInvoice, loading, error } = useSelector((state: RootState) => state.bookings);
  const { rooms } = useSelector((state: RootState) => state.rooms);

  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('history');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  // Close modal on ESC
  useEffect(() => {
    if (!showInvoiceModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowInvoiceModal(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [showInvoiceModal]);

  useEffect(() => {
    if (!user?.userid) return;
    dispatch(getUserBookings({ userId: user.userid, criteria: { page: 1, limit: 20 } }));
    // BE không hỗ trợ userid cho invoice → chỉ lấy theo booking khi cần
  }, [dispatch, user?.userid]);

  const filteredBookings = useMemo(() => {
    let list = bookings;
    if (statusFilter !== 'all') list = list.filter(b => b.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(b =>
        b.details.some(d => {
          const room = rooms.find(r => r.roomid === d.roomid);
          return (
            room?.roomtype.toLowerCase().includes(q) ||
            room?.address.toLowerCase().includes(q)
          );
        })
      );
    }
    return list;
  }, [bookings, statusFilter, search, rooms]);

  const openInvoice = async (bookingId: number) => {
    await dispatch(getInvoiceByBookingId(bookingId));
    setShowInvoiceModal(true);
  };

  const formatDateTime = (iso: string) => new Date(iso).toLocaleString('vi-VN');
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('vi-VN');
  const formatPrice = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <StaggeredSections staggerDelay={150}>
          {/* Banner */}
          <section className="relative bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="p-3 md:p-4 bg-white/20 rounded-2xl">
                  <User className="w-6 md:w-8 h-6 md:h-8" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Trang cá nhân</h1>
                  <p className="text-xs md:text-base text-white/90">Quản lý thông tin và lịch sử đặt phòng</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tabs */}
          <section className="bg-white border-b">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex items-center space-x-4 overflow-x-auto">
                {[
                  { id: 'overview', name: 'Tổng quan' },
                  { id: 'history', name: 'Lịch sử đặt phòng' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 md:px-4 py-2 md:py-3 text-sm md:text-base font-semibold border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-[#667EEA] text-[#667EEA]'
                        : 'border-transparent text-gray-600 hover:text-[#667EEA]'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Overview */}
          {activeTab === 'overview' && (
            <section className="py-8 md:py-12">
              <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Thông tin tài khoản</h3>
                    <div className="space-y-2 text-xs md:text-base text-gray-700">
                      <p><span className="font-semibold">Tên:</span> {user?.fullName || user?.username || 'Người dùng'}</p>
                      <p><span className="font-semibold">Email:</span> {user?.email || '—'}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow md:col-span-2">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Hoạt động gần đây</h3>
                    <div className="space-y-3">
                      {bookings.slice(0, 5).map((b) => (
                        <div key={b.bookingid} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 md:p-4 rounded-xl border">
                          <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                            <Calendar className="w-4 md:w-5 h-4 md:h-5 text-[#667EEA] flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm md:text-base font-semibold text-gray-900">Booking #{b.bookingid}</p>
                              <p className="text-xs md:text-sm text-gray-600 break-words">{formatDateTime(b.starttime)} → {formatDateTime(b.endtime)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => openInvoice(b.bookingid)}
                            className="text-xs md:text-sm text-[#667EEA] hover:text-[#764BA2] font-semibold self-start sm:self-auto"
                          >
                            Xem hóa đơn
                          </button>
                        </div>
                      ))}
                      {bookings.length === 0 && <p className="text-xs md:text-sm text-gray-600">Chưa có booking nào.</p>}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* History */}
          {activeTab === 'history' && (
            <section className="py-8 md:py-12">
              <div className="container mx-auto px-4 md:px-8">
                {/* Filters */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow mb-6">
                  <div className="flex flex-col gap-3 md:gap-4">
                    <div className="flex items-center gap-2 overflow-x-auto">
                      {STATUS_TABS.map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setStatusFilter(tab.id)}
                          className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-colors ${
                            statusFilter === tab.id
                              ? 'bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {tab.name}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm theo phòng hoặc địa chỉ..."
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* List */}
                <div className="space-y-3 md:space-y-4">
                  {loading && (
                    <div className="flex items-center justify-center py-12">
                      <LoadingSpinner size="md" fullScreen={false} />
                    </div>
                  )}

                  {!loading && filteredBookings.map((b) => {
                    const room = rooms.find(r => r.roomid === (b.details[0]?.roomid || 0));
                    return (
                      <div key={b.bookingid} className="bg-white rounded-2xl p-3 md:p-6 shadow flex flex-col gap-3 md:gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                          <div className="w-16 md:w-20 h-16 md:h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src="/file.svg" alt="Booking" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm md:text-base font-bold text-gray-900">Booking #{b.bookingid}</p>
                            <p className="text-xs md:text-sm text-gray-600">{room?.roomtype || 'Phòng'}</p>
                            <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-600 mt-1 md:mt-2">
                              <span className="flex items-center gap-1"><Calendar className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" /> {formatDate(b.starttime)}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" /> {new Date(b.starttime).toLocaleTimeString('vi-VN')} - {new Date(b.endtime).toLocaleTimeString('vi-VN')}</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" /> {room?.address || '—'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                          <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${
                            b.status === 'pending' ? 'bg-yellow-100 text-yellow-800'
                            : b.status === 'confirmed' ? 'bg-blue-100 text-blue-800'
                            : b.status === 'completed' ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'}`}>{b.status}</span>
                          <button
                            onClick={() => openInvoice(b.bookingid)}
                            className="inline-flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm rounded-xl bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white font-semibold hover:shadow-lg whitespace-nowrap"
                          >
                            <FileText className="w-3 md:w-4 h-3 md:h-4" /> <span className="hidden sm:inline">Hóa đơn</span><span className="sm:hidden">HD</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {!loading && filteredBookings.length === 0 && (
                    <div className="text-center text-gray-600 py-12 text-sm md:text-base">Không có booking phù hợp.</div>
                  )}
                </div>
              </div>
            </section>
          )}
        </StaggeredSections>

        <InvoiceModal
          isOpen={showInvoiceModal}
          onClose={() => setShowInvoiceModal(false)}
          invoice={selectedInvoice}
          bookingTime={{
            start: bookings.find(b => b.bookingid === selectedInvoice?.bookingId)?.starttime,
            end: bookings.find(b => b.bookingid === selectedInvoice?.bookingId)?.endtime,
          }}
          room={(rooms.find(r => r.roomid === (bookings.find(b => b.bookingid === selectedInvoice?.bookingId)?.details?.[0]?.roomid || 0)) as any) || null}
        />

        <ScrollToTop />
        <Footer />
      </div>
    </PageTransition>
  );
}


